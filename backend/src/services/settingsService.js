const SettingsRepository = require('../database/repositories/settingsRepository');
const MongooseRepository = require('../database/repositories/mongooseRepository');

const DEFAULT_SETTINGS = {
  id: 'default',
  theme: 'default',
};

/**
 * Handles Settings operations
 */
class SettingsService {
  /**
   * Finds the Settings or creates and returns the default.
   *
   * @param {*} currentUser
   */
  static async findOrCreateDefault(currentUser) {
    return SettingsRepository.findOrCreateDefault(
      DEFAULT_SETTINGS,
      { currentUser },
    );
  }

  /**
   * Saves the Settings.
   *
   * @param {*} data
   * @param {*} currentUser
   */
  static async save(data, currentUser) {
    const session = await MongooseRepository.createSession();

    const settings = await SettingsRepository.save(data, {
      currentUser,
      session,
    });

    await MongooseRepository.commitTransaction(session);

    return settings;
  }
}

module.exports = SettingsService;
