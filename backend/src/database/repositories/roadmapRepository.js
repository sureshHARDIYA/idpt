const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const AuditLogRepository = require('./auditLogRepository');
const EpicRepository = require('./epicRepository');

const Roadmap = require('../models/roadmap');
const Task = require('../models/task');

/**
 * Handles database operations for the Roadmap.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */
module.exports = class RoadmapRepository {
  /**
   * Creates the Roadmap.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  static async create(data, options) {
    if (MongooseRepository.getSession(options)) {
      await Roadmap.createCollection();
    }

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await Roadmap.create(
      [
        {
          ...data,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    const tasks = await Task.find({ owner: record.module })
    const epics = [];

    for (const [key, task] of tasks.entries()) {
      const prerequisite = epics[key - 1];

      const params = {
        task: task.id,
        roadmap: record.id,
        state: (!key && record.state === 'ACTIVATE') ? 'ACTIVATE' : 'LOCKED'
      };

      if (prerequisite) {
        params.prerequisite = {
          [prerequisite.id]: prerequisite.state,
        }
      }

      const epic = await EpicRepository.create(params, options);

      if (key > 0) {
        prerequisite.next.push(epic.id);
        await prerequisite.save();
      }

      epics.push(epic);
    }

    await Roadmap.updateOne(
      { _id: record._id },
      { children: epics.map((i) => i.id) }
    );

    return this.findById(record.id, options);
  }

  /**
   * Deletes the Roadmap.
   *
   * @param {string} id
   * @param {Object} [options]
   */

  static async destroy(id, options) {
    const roadmap = await Roadmap.findOne({ _id: id });

    if (roadmap) {
      await Promise.all(roadmap.children.map((epic) => EpicRepository.destroy(epic, options)))
      await MongooseRepository.wrapWithSessionIfExists(
        Roadmap.deleteOne({ _id: roadmap._id }),
        options,
      );
    }

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      null,
      options,
    );
  }

  /**
   * Counts the number of Patients based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  static async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Roadmap.countDocuments(filter),
      options,
    );
  }

  /**
   * Finds the Patient and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  static async findById(id, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Roadmap.findById(id)
      .populate({
        path: "record",
        populate: "host"
      })
      .populate({
        path: "children",
        populate: {
          path: 'task',
          populate: 'assignments',
        },
      })
      .populate('module'),
      options,
    );
  }

  /**
   * Finds the Patients based on the query.
   * See https://mongoosejs.com/docs/queries.html to learn how
   * to customize the queries.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.offset
   * @param  {string} query.orderBy
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  static async findAndCountAll(
    { filter, limit, offset, orderBy } = {
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
    options,
  ) {
    let criteria = {};

    if (filter) {
      if (filter.id) {
        criteria = {
          ...criteria,
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        };
      }

      if (filter.name) {
        criteria = {
          ...criteria,
          name: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.name,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.birthdateRange) {
        const [start, end] = filter.birthdateRange;

        if (start !== undefined && start !== null && start !== '') {
          criteria = {
            ...criteria,
            birthdate: {
              ...criteria.birthdate,
              $gte: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          criteria = {
            ...criteria,
            birthdate: {
              ...criteria.birthdate,
              $lte: end,
            },
          };
        }
      }

      if (filter.gender) {
        criteria = {
          ...criteria,
          gender: filter.gender
        };
      }

      if (filter.phone) {
        criteria = {
          ...criteria,
          phone: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.phone,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          criteria = {
            ...criteria,
            ['createdAt']: {
              ...criteria.createdAt,
              $gte: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          criteria = {
            ...criteria,
            ['createdAt']: {
              ...criteria.createdAt,
              $lte: end,
            },
          };
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;

    const rows = await Roadmap.find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('assignCase');

    const count = await Roadmap.countDocuments(criteria);

    return { rows, count };
  }

  /**
   * Lists the Patients to populate the autocomplete.
   * See https://mongoosejs.com/docs/queries.html to learn how to
   * customize the query.
   *
   * @param {Object} search
   * @param {number} limit
   */
  static async findAllAutocomplete(search, limit) {
    let criteria = {};

    if (search) {
      criteria = {
        $or: [
          { _id: MongooseQueryUtils.uuid(search) },
          {
            name: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },
        ],
      };
    }

    const sort = MongooseQueryUtils.sort('name_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const records = await Roadmap.find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record['name'],
    }));
  }

  /**
   * Creates an audit log of the operation.
   *
   * @param {string} action - The action [create, update or delete].
   * @param {object} id - The record id
   * @param {object} data - The new data passed on the request
   * @param {object} options
   */
  static async _createAuditLog(action, id, data, options) {
    await AuditLogRepository.log(
      {
        entityName: Roadmap.modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }
}
