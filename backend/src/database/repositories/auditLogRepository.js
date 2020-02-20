const AuditLog = require('../models/auditLog');
const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');

/**
 * Handles database operations for Audit Logs.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */
module.exports = class AuditLogRepository {
  static get CREATE() {
    return 'create';
  }
  static get UPDATE() {
    return 'update';
  }
  static get DELETE() {
    return 'delete';
  }

  /**
   * Saves an Audit Log to the database.
   *
   * @param  {Object} log - The log being saved.
   * @param  {string} log.entityName - The name of the entity. Ex.: customer
   * @param  {string} log.entityId - The id of the entity.
   * @param  {string} log.action - The action [create, update or delete].
   * @param  {Object} log.values - The JSON log value with data of the entity.
   *
   * @param  {Object} options
   * @param  {Object} options.session - The current database session.
   * @param  {Object} options.currentUser - The current logged user.
   */
  static async log(
    { entityName, entityId, action, values },
    options,
  ) {
    if (MongooseRepository.getSession(options)) {
      await AuditLog.createCollection();
    }

    const [log] = await AuditLog.create(
      [
        {
          entityName,
          entityId,
          action,
          values,
          timestamp: new Date(),
          createdById:
            options && options.currentUser
              ? options.currentUser.id
              : null,
          createdByEmail:
            options && options.currentUser
              ? options.currentUser.email
              : null,
        },
      ],
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    return log;
  }

  /**
   * Finds the Audit Logs based on the query.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.offset
   * @param  {string} query.orderBy
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  static async findAndCountAll({
    filter,
    limit = 0,
    offset = 0,
    orderBy = null,
  }) {
    let criteria = {};

    if (filter) {
      if (filter.timestampRange) {
        const [start, end] = filter.timestampRange;

        if (start !== undefined && start !== null && start !== '') {
          criteria = {
            ...criteria,
            ['timestamp']: {
              ...criteria.timestamp,
              $gte: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          criteria = {
            ...criteria,
            ['timestamp']: {
              ...criteria.timestamp,
              $lte: end,
            },
          };
        }
      }

      if (filter.action) {
        criteria = {
          ...criteria,
          ['action']: filter.action,
        };
      }

      if (filter.entityId) {
        criteria = {
          ...criteria,
          ['entityId']: filter.entityId,
        };
      }

      if (filter.createdByEmail) {
        criteria = {
          ...criteria,
          ['createdByEmail']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.createdByEmail,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.entityNames && filter.entityNames.length) {
        criteria = {
          ...criteria,
          ['entityName']: {
            $in: filter.entityNames,
          },
        };
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;

    const rows = await AuditLog.find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await AuditLog.countDocuments(criteria);

    return { rows, count };
  }
};
