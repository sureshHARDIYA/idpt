const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const AuditLogRepository = require('./auditLogRepository');
const ScoredData = require('../models/scoredData');

/**
 * Handles database operations for the ScoredData.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */
class ScoredDataRepository {
  /**
   * Creates the ScoredData.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async create(data, options) {
    if (MongooseRepository.getSession(options)) {
      await ScoredData.createCollection();
    }

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    //var dataWithPatient = data;
    //dataWithPatient.fhir.subject.display = currentUser.fullName;

    const [record] = await ScoredData.create(
      [
        {
          //...dataWithPatient,
          ...data,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
          //patient: currentUser.fullName
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

    return this.findById(record.id, options);
  }

  /**
   * Updates the ScoredData.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async update(id, data, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      ScoredData.updateOne(
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

    return record;
  }

  /**
   * Deletes the ScoredData.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy(id, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      ScoredData.deleteOne({ _id: id }),
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
   * Counts the number of ScoredDatas based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      ScoredData.countDocuments(filter),
      options,
    );
  }

  /**
   * Finds the ScoredData and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async findById(id, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      ScoredData.findById(id),
      options,
    );
  }

  /**
   * Finds the ScoredData and its relations.
   *
   * @param {string} ids
   * @param {Object} [options]
   */
  async findByIds(ids, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      ScoredData.find({ _id: { $in: ids } }),
      options,
    );
  }

  /**
   * Finds the ScoredDatas based on the query.
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
    console.log("HALLAISIKEN 3 menhvor er")
    console.log(filter)
    let criteria = {};

    if (filter) {
      if (filter.id) {
        criteria = {
          ...criteria,
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        };
      }

      if (filter.dataType) {
        criteria = {
          ...criteria,
          dataType: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.dataType,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.patientName) {
        criteria = {
          ...criteria,
          patientName: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.patientName,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.fhir.subject.reference) {
        criteria = {
          ...criteria,
          fhir: { subject: { reference:
            filter.fhir.subject.reference
          }},
        };
      }

      if (filter.score) {
        criteria = {
          ...criteria,
          score: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.score,
            ),
            $options: 'i',
          },
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

    console.log("CRITERIER!");
    console.log(JSON.stringify(criteria));

    const rows = await ScoredData.find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    console.log("Her er radene!!!");
    console.log(rows);

    const count = await ScoredData.countDocuments(criteria);

    return { rows, count };
  }

  /**
   * Lists the ScoredDatas to populate the autocomplete.
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

    const records = await ScoredData.find(criteria)
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
        entityName: ScoredData.modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }
}

module.exports = ScoredDataRepository;
