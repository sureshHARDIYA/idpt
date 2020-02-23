const MongooseRepository = require('./mongooseRepository');
const User = require('../models/user');
const AuditLogRepository = require('./auditLogRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const lodash = require('lodash');
const crypto = require('crypto');

/**
 * Handles database operations for Users.
 * See https://mongoosejs.com/docs/index.html to learn how to customize it.
 */
module.exports = class UserRepository {
  /**
   * Creates a User.
   */
  static async create(data, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    data = this._preSave(data);

    if (MongooseRepository.getSession(options)) {
      await User.createCollection();
    }

    const [user] = await User.create(
      [
        {
          email: data.email,
          patient: data.patient,
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          fullName: data.fullName || null,
          phoneNumber: data.phoneNumber || null,
          importHash: data.importHash || null,
          authenticationUid: data.authenticationUid || null,
          avatars: data.avatars || [],
          roles: data.roles || [],
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, options);
  }

  /**
   * Creates the user based on the auth information.
   *
   * @param {*} data
   * @param {*} [options]
   */
  static async createFromAuth(data, options) {
    data = this._preSave(data);

    if (MongooseRepository.getSession(options)) {
      await User.createCollection();
    }

    let [user] = await User.create(
      [
        {
          email: data.email,
          patient: data.patient,
          password: data.password,
          firstName: data.firstName,
          fullName: data.fullName,
          authenticationUid: data.authenticationUid,
          roles: data.roles || [],
        },
      ],
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: user.id },
        {
          authenticationUid: user.id,
        },
      ),
      options,
    );

    delete user.password;
    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, options);
  }

  /**
   * Updates the password of the user.
   *
   * @param {*} id
   * @param {*} password
   * @param {*} [options]
   */
  static async updatePassword(id, password, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          authenticationUid: id,
          password,
          updatedBy: currentUser.id,
        },
      ),
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          authenticationUid: id,
        },
      },
      options,
    );

    return this.findById(id, options);
  }

  /**
   * Updates the profile of the user.
   *
   * @param {*} id
   * @param {*} data
   * @param {*} [options]
   */
  static async updateProfile(id, data, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    data = this._preSave(data);

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          patient: data.patient,
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          fullName: data.fullName || null,
          phoneNumber: data.phoneNumber || null,
          updatedBy: currentUser.id,
          avatars: data.avatars || [],
        },
      ),
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }

  /**
   * Generates the email verification token.
   *
   * @param {*} email
   * @param {*} [options]
   */
  static async generateEmailVerificationToken(
    email,
    options,
  ) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const { id } = await this.findByEmailWithoutAvatar(
      email,
      options,
    );

    const emailVerificationToken = crypto
      .randomBytes(20)
      .toString('hex');
    const emailVerificationTokenExpiresAt =
      Date.now() + 360000;

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          emailVerificationToken,
          emailVerificationTokenExpiresAt,
          updatedBy: currentUser.id,
        },
      ),
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          emailVerificationToken,
          emailVerificationTokenExpiresAt,
        },
      },
      options,
    );

    return emailVerificationToken;
  }

  /**
   * Generates the password reset token.
   *
   * @param {*} email
   * @param {*} [options]
   */
  static async generatePasswordResetToken(email, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const { id } = await this.findByEmailWithoutAvatar(
      email,
      options,
    );

    const passwordResetToken = crypto
      .randomBytes(20)
      .toString('hex');
    const passwordResetTokenExpiresAt = Date.now() + 360000;

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          passwordResetToken,
          passwordResetTokenExpiresAt,
          updatedBy: currentUser.id,
        },
      ),
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          passwordResetToken,
          passwordResetTokenExpiresAt,
        },
      },
      options,
    );

    return passwordResetToken;
  }

  /**
   * Updates the status of the user: Disabled or Enabled.
   *
   * @param {*} id
   * @param {*} disabled
   * @param {*} [options]
   */
  static async updateStatus(id, disabled, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          disabled,
          updatedBy: currentUser.id,
        },
      ),
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          disabled,
        },
      },
      options,
    );

    return this.findById(id, options);
  }

  /**
   * Updates the roles of the user.
   *
   * @param {*} id
   * @param {*} roles
   * @param {*} [options]
   */
  static async updateRoles(id, roles, options) {
    const user = await MongooseRepository.wrapWithSessionIfExists(
      User.findById(id),
      options,
    );

    if (options.addRoles) {
      user.roles = [...user.roles, ...roles];
    } else if (options.removeOnlyInformedRoles) {
      user.roles = lodash.difference(user.roles, roles);
    } else {
      user.roles = roles;
    }

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          roles: user.roles,
        },
      },
      options,
    );

    await user.save();

    return this.findById(user.id, options);
  }

  /**
   * Updates a User.
   *
   * @param {*} id
   * @param {*} data
   * @param {*} [options]
   */
  static async update(id, data, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    data = this._preSave(data);

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          patient: data.patient,
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          fullName: data.fullName || null,
          phoneNumber: data.phoneNumber || null,
          updatedBy: currentUser.id,
          avatars: data.avatars || [],
          roles: data.roles || [],
        },
      ),
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }

  /**
   * Finds the user by email.
   *
   * @param {*} email
   * @param {*} [options]
   */
  static async findByEmail(email, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.findOne({ email }),
      options,
    );
  }

  /**
   * Find the user by email, but without fetching the avatar.
   *
   * @param {*} email
   * @param {*} [options]
   */
  static async findByEmailWithoutAvatar(email, options) {
    return this.findByEmail(email, options);
  }

  /**
   * Finds the user based on the query.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.offset
   * @param  {string} query.orderBy
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  static async findAllWithCount(
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

      if (filter.fullName) {
        criteria = {
          ...criteria,
          ['fullName']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.fullName,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.email) {
        criteria = {
          ...criteria,
          ['email']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.email,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.role) {
        criteria = {
          ...criteria,
          ['roles']: {
            $in: filter.role,
          },
        };
      }

      if (filter.status) {
        const disabled = filter.status === 'disabled';
        criteria = {
          ...criteria,
          ['disabled']: disabled,
        };
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

    const rows = await MongooseRepository.wrapWithSessionIfExists(
      User.find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort),
      options,
    );

    const count = await MongooseRepository.wrapWithSessionIfExists(
      User.countDocuments(criteria),
      options,
    );

    return { rows, count };
  }

  /**
   * Lists the users to populate the autocomplete.
   *
   * @param {Object} search
   * @param {number} limit
   */
  static async findAllAutocomplete(search, limit) {
    let criteria = {};

    if (search) {
      criteria = {
        $or: [
          { _id: MongooseQueryUtils.uuid(search) },
          {
            fullName: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },
          {
            email: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },
        ]
      };
    }

    const sort = MongooseQueryUtils.sort('fullName_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const users = await User.find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    const buildText = (user) => {
      if (!user.fullName) {
        return user.email;
      }

      return `${user.fullName} <${user.email}>`;
    };

    return users.map((user) => ({
      id: user.id,
      label: buildText(user),
    }));
  }

  /**
   * Finds the user and all its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  static async findById(id, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.findById(id),
      options,
    );
  }

  /**
   * Finds the user, without fetching the avatar.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  static async findByIdWithoutAvatar(id, options) {
    return this.findById(id, options);
  }

  /**
   * Finds the users with the ids and filters based on the disabled flag.
   *
   * @param {*} ids
   * @param {*} disabled
   * @param {*} [options]
   */
  static async findAllByDisabled(ids, disabled, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.find({
        _id: { $in: ids },
        disabled: !!disabled,
      }),
      options,
    );
  }

  /**
   * Finds the user by the password token if not expired.
   *
   * @param {*} token
   * @param {*} [options]
   */
  static async findByPasswordResetToken(token, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.findOne({
        passwordResetToken: token,
        passwordResetTokenExpiresAt: { $gt: Date.now() },
      }),
      options,
    );
  }

  /**
   * Finds the user by the email verification token if not expired.
   *
   * @param {*} token
   * @param {*} [options]
   */
  static async findByEmailVerificationToken(
    token,
    options,
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.findOne({
        emailVerificationToken: token,
        emailVerificationTokenExpiresAt: {
          $gt: Date.now(),
        },
      }),
      options,
    );
  }

  /**
   * Marks the user email as verified.
   *
   * @param {*} id
   * @param {*} [options]
   */
  static async markEmailVerified(id, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          emailVerified: true,
          updatedBy: currentUser.id,
        },
      ),
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          emailVerified: true,
        },
      },
      options,
    );

    return true;
  }

  /**
   * Counts the users based on the filter.
   *
   * @param {*} [filter]
   * @param {*} [options]
   */
  static async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.countDocuments(filter),
      options,
    );
  }

  /**
   * Normalize the user fields.
   *
   * @param {*} data
   */
  static _preSave(data) {
    if (data.firstName || data.lastName) {
      data.fullName = `${(data.firstName || '').trim()} ${(
        data.lastName || ''
      ).trim()}`.trim();
    }

    data.email = data.email ? data.email.trim() : null;

    data.firstName = data.firstName
      ? data.firstName.trim()
      : null;

    data.lastName = data.lastName
      ? data.lastName.trim()
      : null;

    return data;
  }
};
