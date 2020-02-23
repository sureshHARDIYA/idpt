const mongoose = require('mongoose');
const database = require('../database');
const config = require('../../../config')();

/**
 * Abstracts some basic Mongoose operations.
 * See https://mongoosejs.com/docs/index.html
 */
module.exports = class MongooseRepository {
  /**
   * Cleans the database.
   */
  static async cleanDatabase() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error(
        'Clean database only allowed for test!',
      );
    }

    return database.connection.dropDatabase();
  }

  /**
   * Returns the currentUser if it exists on the options.
   *
   * @param {object} options
   */
  static getCurrentUser(options) {
    return (options && options.currentUser) || { id: null };
  }

  /**
   * Returns the session if it exists on the options.
   *
   * @param {object} options
   */
  static getSession(options) {
    return (options && options.session) || undefined;
  }

  /**
   * Creates a database session and transaction.
   */
  static async createSession() {
    if (!config.database.transactions) {
      return;
    }

    const session = await database.connection.startSession();
    await session.startTransaction();
    return session;
  }

  /**
   * Commits a database transaction.
   */
  static async commitTransaction(session) {
    if (!config.database.transactions) {
      return;
    }

    return session.commitTransaction();
  }

  /**
   * Aborts a database transaction.
   */
  static async abortTransaction(session) {
    if (!config.database.transactions) {
      return;
    }

    return session.abortTransaction();
  }

  /**
   * Wraps the operation with the current session.
   *
   * @param {*} toWrap
   * @param {*} options
   */
  static async wrapWithSessionIfExists(toWrap, options) {
    if (!this.getSession(options)) {
      return toWrap;
    }

    return toWrap.session(this.getSession(options));
  }

  /**
   * Returns the session as an option object if it exists on the options.
   *
   * @param {object} options
   */
  static getSessionOptionsIfExists(options) {
    if (!this.getSession(options)) {
      return undefined;
    }

    return { session: this.getSession(options) };
  }

  /**
   * In the case of a two way relationship, both records from both collections
   * must be in sync.
   * This method ensures it for Many to One relations.
   *
   * @param {*} record
   * @param {*} sourceModel
   * @param {*} sourceProperty
   * @param {*} targetModel
   * @param {*} targetProperty
   * @param {*} options
   */
  static async refreshTwoWayRelationManyToOne(
    record,
    sourceModel,
    sourceProperty,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      sourceModel.updateMany(
        {
          _id: { $nin: record._id },
          [sourceProperty]: { $in: record[sourceProperty] },
        },
        {
          $pullAll: {
            [sourceProperty]: record[sourceProperty],
          },
        },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $in: record[sourceProperty] },
        },
        { [targetProperty]: record._id },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $nin: record[sourceProperty] },
          [targetProperty]: record._id,
        },
        { [targetProperty]: null },
      ),
      options,
    );
  }

  /**
   * In the case of a two-way relationship, both records from
   * both collections must be in sync.
   * This method ensures it for One to One relations.
   *
   * @param {*} record
   * @param {*} sourceProperty
   * @param {*} targetModel
   * @param {*} targetProperty
   * @param {*} options
   */
  static async refreshTwoWayRelationOneToMany(
    record,
    sourceProperty,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateOne(
        { _id: record[sourceProperty] },
        { $addToSet: { [targetProperty]: record._id } },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $ne: record[sourceProperty] },
          [targetProperty]: record._id,
        },
        { $pull: { [targetProperty]: record._id } },
      ),
      options,
    );
  }

  /**
   * In the case of a two-way relationship, both records from
   * both collections must be in sync.
   * This method ensures it for Many to Many relations.
   *
   * @param {*} record
   * @param {*} sourceProperty
   * @param {*} targetModel
   * @param {*} targetProperty
   * @param {*} options
   */
  static async refreshTwoWayRelationManyToMany(
    record,
    sourceProperty,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        { _id: { $in: record[sourceProperty] } },
        { $addToSet: { [targetProperty]: record._id } },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $nin: record[sourceProperty] },
          [targetProperty]: { $in: record._id },
        },
        { $pull: { [targetProperty]: record._id } },
      ),
      options,
    );
  }

  /**
   * If the record is referenced on other collection,
   * clears the referece from the other collection.
   * This method handles the relatino to many.
   *
   * @param {*} recordId
   * @param {*} targetModel
   * @param {*} targetProperty
   * @param {*} options
   */
  static async destroyRelationToMany(
    recordId,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        { [targetProperty]: recordId },
        { $pull: { [targetProperty]: recordId } },
      ),
      options,
    );
  }

  /**
   * If the record is referenced on other collection,
   * clears the referece from the other collection.
   * This method handles the relatino to one.
   *
   * @param {*} recordId
   * @param {*} targetModel
   * @param {*} targetProperty
   * @param {*} options
   */
  static async destroyRelationToOne(
    recordId,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        { [targetProperty]: recordId },
        { [targetProperty]: null },
      ),
      options,
    );
  }


  static idFromString (id) {
    return mongoose.Types.ObjectId(id)
  }
};
