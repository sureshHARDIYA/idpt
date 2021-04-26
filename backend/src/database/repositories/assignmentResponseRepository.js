const MongooseRepository = require('./mongooseRepository')
const MongooseQueryUtils = require('../utils/mongooseQueryUtils')
const AuditLogRepository = require('./auditLogRepository')
const assignmentResponse = require('../models/assignmentResponse')

/**
 * Handles database operations for the assignmentResponse.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */
class assignmentResponseRepository {
  /**
   * Creates the assignmentResponse.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async create (data, options) {
    if (MongooseRepository.getSession(options)) {
      await assignmentResponse.createCollection()
    }

    const currentUser = MongooseRepository.getCurrentUser(options)
    const [ record ] = await assignmentResponse.create(
      [ { ...data, createdBy: currentUser.id, updatedBy: currentUser.id } ],
      MongooseRepository.getSessionOptionsIfExists(options)
    )

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options
    )

    return this.findById(record.id, options)
  }

  /**
   * Updates the assignmentResponse.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async update (id, data, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      assignmentResponse.updateOne({ _id: id }, {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(options).id
      }),
      options
    )

    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options)

    const record = await this.findById(id, options)

    return record
  }

  /**
   * Deletes the assignmentResponse.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy (id, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      assignmentResponse.deleteOne({ _id: id }),
      options
    )

    await this._createAuditLog(AuditLogRepository.DELETE, id, null, options)
  }

  /**
   * Counts the number of assignmentResponses based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  async count (filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      assignmentResponse.countDocuments(filter),
      options
    )
  }

  /**
   * Finds the assignmentResponse and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async findById (id, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      assignmentResponse.findById(id).populate('owner'),
      options
    )
  }

  /**
   * Finds the assignmentResponses based on the query.
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
  async findAndCountAll (
    { filter, limit, offset, orderBy } = {
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null
    },
    options
  ) {
    let criteria = {}

    if (filter) {
      if (filter.id) {
        criteria = { ...criteria, _id: MongooseQueryUtils.uuid(filter.id) }
      }

      if (filter.url) {
        criteria = {
          ...criteria,
          url: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.url),
            $options: 'i'
          }
        }
      }

      if (filter.createdAtRange) {
        const [ start, end ] = filter.createdAtRange

        if (start !== undefined && start !== null && start !== '') {
          criteria = {
            ...criteria,
            createdAt: { ...criteria.createdAt, $gte: start }
          }
        }

        if (end !== undefined && end !== null && end !== '') {
          criteria = {
            ...criteria,
            createdAt: { ...criteria.createdAt, $lte: end }
          }
        }
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || 'createdAt_DESC')

    const skip = Number(offset || 0) || undefined
    const limitEscaped = Number(limit || 0) || undefined

    const rows = await assignmentResponse
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('assignmentID')
      .populate('createdBy')

    const count = await assignmentResponse.countDocuments(criteria)

    return { rows, count }
  }

  /**
   * Lists the assignmentResponses to populate the autocomplete.
   * See https://mongoosejs.com/docs/queries.html to learn how to
   * customize the query.
   *
   * @param {Object} search
   * @param {number} limit
   */
  async findAllAutocomplete (search, limit) {
    let criteria = {}

    if (search) {
      criteria = {
        $or: [
          { _id: MongooseQueryUtils.uuid(search) },
          {
            url: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i'
            }
          }
        ]
      }
    }

    const sort = MongooseQueryUtils.sort('url_ASC')
    const limitEscaped = Number(limit || 0) || undefined

    const records = await assignmentResponse
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort)

    return records.map(record => ({ id: record.id, label: record['title'] }))
  }

  /**
   * Creates an audit log of the operation.
   *
   * @param {string} action - The action [create, update or delete].
   * @param {object} id - The record id
   * @param {object} data - The new data passed on the request
   * @param {object} options
   */
  async _createAuditLog (action, id, data, options) {
    await AuditLogRepository.log(
      {
        entityName: assignmentResponse.modelName,
        entityId: id,
        action,
        values: data
      },
      options
    )
  }
}

module.exports = assignmentResponseRepository
