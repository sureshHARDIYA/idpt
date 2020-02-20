const MongooseRepository = require('./mongooseRepository');
const Settings = require('../models/settings');
const AuditLogRepository = require('./auditLogRepository');

/**
 * Handles database operations for Settings.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */
module.exports = class SettingsRepository {
  /**
   * Finds the settings or creates and returns the default.
   *
   * @param {*} defaults
   * @param {*} [options]
   */
  static async findOrCreateDefault(defaults, options) {
    const first = await MongooseRepository.wrapWithSessionIfExists(
      Settings.findOne(),
      options,
    );

    if (first) {
      return first;
    }

    const [settings] = await Settings.create(
      [
        {
          ...defaults,
          createdBy: MongooseRepository.getCurrentUser(
            options,
          )
            ? MongooseRepository.getCurrentUser(options).id
            : null,
        },
      ],
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    return settings;
  }

  /**
   * Saves the settings.
   *
   * @param {*} data
   * @param {*} [options]
   */
  static async save(data, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      Settings.updateMany(undefined, data),
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'settings',
        entityId: 'default',
        action: AuditLogRepository.UPDATE,
        values: data,
      },
      options,
    );

    return MongooseRepository.wrapWithSessionIfExists(
      Settings.findOne(),
      options,
    );
  }
};
