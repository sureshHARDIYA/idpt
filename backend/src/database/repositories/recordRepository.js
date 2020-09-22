const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const AuditLogRepository = require('./auditLogRepository');
const RoadmapRepository = require('./roadmapRepository');
const Record = require('../models/record');
const Module = require('../models/module');
const _find = require('lodash/find');

/**
 * Handles database operations for the Record.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */
class RecordRepository {
  /**
   * Creates the Record.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async create(data, options) {
    if (MongooseRepository.getSession(options)) {
      await Record.createCollection();
    }

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await Record.create(
      [
        {
          ...data,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    const modules = await Module.getRoadmap(data.host);
    const roadmaps = [];

    for (const [key, module] of modules.entries()) {
      const prerequisite = roadmaps[key - 1];

      const params = {
        record: record.id,
        module: module.id,
        state: key ? 'LOCKED' : 'ACTIVATE',
      };

      if (prerequisite) {
        params.prerequisite = {
          [prerequisite.id]: prerequisite.state,
        };
      }

      const epic = await RoadmapRepository.create(
        params,
        options,
      );

      if (key > 0) {
        prerequisite.next.push(epic.id);
        await prerequisite.save();
      }

      roadmaps.push(epic);
    }

    await Record.updateOne(
      { _id: record._id },
      { roadmaps: roadmaps.map((i) => i.id) },
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  /**
   * Updates the Record.
   *
   * @param {Object} data
   * @param {Object} [options]
   */

  async update(id, data, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      Record.updateOne(
        { _id: id },
        {
          ...data,
          updatedBy: MongooseRepository.getCurrentUser(
            options,
          ).id,
        },
      ),
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    return await this.findById(id, options);
  }

  /**
   * Deletes the Record.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy(id, options) {
    const record = await Record.findById(id);

    await Promise.all(
      record.roadmaps.map((roadmap) =>
        RoadmapRepository.destroy(roadmap, options),
      ),
    );

    await MongooseRepository.wrapWithSessionIfExists(
      Record.deleteOne({ _id: record._id }),
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      null,
      options,
    );
  }

  /**
   * Counts the number of Records based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Record.countDocuments(filter),
      options,
    );
  }

  /**
   * Finds the Record and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async findById(id, options) {
    const a = await MongooseRepository.wrapWithSessionIfExists(
      Record.findById(id)
        .populate('owner')
        .populate('host')
        .populate({
          path: 'roadmaps',
          populate: [
            {
              path: 'children',
              populate: 'task',
            },
            {
              path: 'module',
            },
          ],
        }),
      options,
    );

    return a;
  }

  /**
   * Finds the Records based on the query.
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
  async findAndCountAll(
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

      if (filter.patient) {
        criteria = {
          ...criteria,
          ['owner']: MongooseQueryUtils.uuid(
            filter.patient,
          ),
        };
      }

      if (filter.description) {
        criteria = {
          ...criteria,
          description: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.description,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.state) {
        criteria = {
          ...criteria,
          state: filter.state,
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteria = {
            ...criteria,
            ['createdAt']: {
              ...criteria.createdAt,
              $gte: start,
            },
          };
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
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

    const rows = await Record.find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('owner')
      .populate('host');

    const count = await Record.countDocuments(criteria);

    return { rows, count };
  }

  /**
   * Lists the Records to populate the autocomplete.
   * See https://mongoosejs.com/docs/queries.html to learn how to
   * customize the query.
   *
   * @param {Object} search
   * @param {number} limit
   */
  async findAllAutocomplete(search, limit) {
    let criteria = {};

    if (search) {
      criteria = {
        $or: [
          { _id: MongooseQueryUtils.uuid(search) },
          {
            name: {
              $regex: MongooseQueryUtils.escapeRegExp(
                search,
              ),
              $options: 'i',
            },
          },
        ],
      };
    }

    const sort = MongooseQueryUtils.sort('name_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const records = await Record.find(criteria)
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
  async _createAuditLog(action, id, data, options) {
    await AuditLogRepository.log(
      {
        entityName: Record.modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }
}

module.exports = RecordRepository;
