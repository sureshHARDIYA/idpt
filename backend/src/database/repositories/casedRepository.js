const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const AuditLogRepository = require('./auditLogRepository');
const Cased = require('../models/cased');
const Module = require('../models/module');
const Patient = require('../models/patient');

/**
 * Handles database operations for the Cased.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */
class CasedRepository {
  /**
   * Creates the Cased.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async create(data, options) {
    if (MongooseRepository.getSession(options)) {
      await Cased.createCollection();
    }

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await Cased.create(
      [
        {
          ...data,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    await MongooseRepository.refreshTwoWayRelationManyToMany(
      record,
      'modules',
      Module,
      'owner',
      options,
    );

    await MongooseRepository.refreshTwoWayRelationManyToMany(
      record,
      'patients',
      Patient,
      'assignCase',
      options,
    );

    return this.findById(record.id, options);
  }

  /**
   * Updates the Cased.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async update(id, data, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      Cased.updateOne(
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

    const record = await this.findById(id, options);

    await MongooseRepository.refreshTwoWayRelationManyToMany(
      record,
      'modules',
      Module,
      'owner',
      options,
    );

    await MongooseRepository.refreshTwoWayRelationManyToMany(
      record,
      'patients',
      Patient,
      'assignCase',
      options,
    );

    return record;
  }

  /**
   * Deletes the Cased.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy(id, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      Cased.deleteOne({ _id: id }),
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      null,
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Patient,
      'assignCase',
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Module,
      'owner',
      options,
    );
  }

  /**
   * Counts the number of Caseds based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Cased.countDocuments(filter),
      options,
    );
  }

  /**
   * Finds the Cased and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async findById(id, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Cased.findById(id)
      .populate('modules')
      .populate('patients'),
      options,
    );
  }

  /**
   * Finds the Caseds based on the query.
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

      if (filter.status) {
        criteria = {
          ...criteria,
          status: filter.status
        };
      }

      if (filter.availableFromRange) {
        const [start, end] = filter.availableFromRange;

        if (start !== undefined && start !== null && start !== '') {
          criteria = {
            ...criteria,
            availableFrom: {
              ...criteria.availableFrom,
              $gte: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          criteria = {
            ...criteria,
            availableFrom: {
              ...criteria.availableFrom,
              $lte: end,
            },
          };
        }
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

    const rows = await Cased.find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('modules')
      .populate('patients');

    const count = await Cased.countDocuments(criteria);

    return { rows, count };
  }

  /**
   * Lists the Caseds to populate the autocomplete.
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
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },
        ],
      };
    }

    const sort = MongooseQueryUtils.sort('name_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const records = await Cased.find(criteria)
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
        entityName: Cased.modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }
}

module.exports = CasedRepository;
