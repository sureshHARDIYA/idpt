const database = require('../database');

/**
 * Utilities to use on Mongoose queries.
 */
module.exports = class MongooseQueryUtils {
  /**
   * If you pass an invalid uuid to a query, it throws an exception.
   * To hack this behaviour, if the uuid is invalid, it creates a new one,
   * that won't match any of the database.
   * If the uuid is invalid, brings no results.
   *
   * @param {*} value
   */
  static uuid(value) {
    let id = value;

    // If ID is invalid, mongodb throws an error.
    // For that not to happen, if the ObjectID is invalid, it sets
    // some random ObjectID
    if (!database.Types.ObjectId.isValid(id)) {
      id = database.Types.ObjectId.createFromTime(
        +new Date(),
      );
    }

    return id;
  }

  /**
   * Some string values may break the RegExp used for queries.
   * This method escapes it.
   * @param {*} value
   */
  static escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Returns the sort clause.
   * @param {*} orderBy
   */
  static sort(orderBy) {
    if (!orderBy) {
      return undefined;
    }

    let [column, order] = orderBy.split('_');

    if (column === 'id') {
      column = '_id';
    }

    return {
      [column]: order === 'ASC' ? 1 : -1,
    };
  }
};
