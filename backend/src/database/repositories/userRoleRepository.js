const MongooseRepository = require('./mongooseRepository');
const User = require('../models/user');
const lodash = require('lodash');

/**
 * Handles database operations for User Roles.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */
module.exports = class UserRoleRepository {
  /**
   * Finds the roles based on the filter, and fills with the related users.
   */
  static async findAllWithUsers({ filter, orderBy }) {
    let criteria = {};

    if (filter && filter.role) {
      criteria = {
        ...criteria,
        ['roles']: {
          $in: filter.role,
        },
      };
    }

    const users = await User.find(criteria);

    const roles = [
      ...new Set(
        lodash.flatMap(users.map((user) => user.roles)),
      ),
    ];

    if (orderBy) {
      const [column, order] = orderBy.split('_');
      if (order === 'ASC') {
        roles.sort((a, b) => a.localeCompare(b));
      } else {
        roles.sort((a, b) => b.localeCompare(a));
      }
    }

    return roles.map((role) => ({
      role,
      users: users.filter((user) =>
        user.roles.includes(role),
      ),
    }));
  }

  /**
   * Find users by role.
   *
   * @param {*} role
   * @param {*} [options]
   */
  static async findAllUsersByRole(role, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.find({ roles: role }),
      options,
    );
  }

  /**
   * Finds the roles of the user.
   *
   * @param {*} userId
   * @param {*} [options]
   */
  static async findAllByUser(userId, options) {
    const user = await MongooseRepository.wrapWithSessionIfExists(
      User.findById(userId),
      options,
    );
    return user.roles;
  }
};
