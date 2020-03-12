const RoadmapRepository = require('../database/repositories/roadmapRepository');
const MongooseRepository = require('../database/repositories/mongooseRepository');

/**
 * Handles Audio operations
 */
module.exports = class RoadmapService {
  constructor({ currentUser, language }) {
    this.repository = RoadmapRepository;
    this.currentUser = currentUser;
    this.language = language;
  }

  /**
   * Updates a Audio.
   *
   * @param {*} id
   * @param {*} data
   */
  async update(id, data) {
    const session = await MongooseRepository.createSession();

    try {
      const record = await this.repository.update(
        id,
        data,
        {
          session,
          currentUser: this.currentUser,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  /**
   * Destroy all Audios with those ids.
   *
   * @param {*} ids
   */
  async destroyAll(ids) {
    const session = await MongooseRepository.createSession();

    try {
      for (const id of ids) {
        await this.repository.destroy(id, {
          session,
          currentUser: this.currentUser,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  /**
   * Finds the Audio by Id.
   *
   * @param {*} id
   */
  async findById(id) {
    return this.repository.findById(id);
  }

  /**
   * Finds Audios for Autocomplete.
   *
   * @param {*} search
   * @param {*} limit
   */
  async findAllAutocomplete(search, limit) {
    return this.repository.findAllAutocomplete(
      search,
      limit,
    );
  }

  /**
   * Finds Audios based on the query.
   *
   * @param {*} args
   */
  async findAndCountAll(args) {
    return this.repository.findAndCountAll(args);
  }
};
