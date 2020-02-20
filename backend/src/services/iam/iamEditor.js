const Roles = require('../../security/roles');
const assert = require('assert');
const ValidationError = require('../../errors/validationError');
const UserRepository = require('../../database/repositories/userRepository');
const UserRoleRepository = require('../../database/repositories/userRoleRepository');
const MongooseRepository = require('../../database/repositories/mongooseRepository');

/**
 * Handles the edition of the user(s) via the IAM page.
 */
module.exports = class IamEditor {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;

    this.data = null;
    this.session = null;
    this.user = null;
  }

  /**
   * Updates a User via the IAM page.
   *
   * @param {*} data
   */
  async update(data) {
    this.data = data;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession();

      await this._loadUser();
      await this._updateAtDatabase();

      await MongooseRepository.commitTransaction(
        this.session,
      );
    } catch (error) {
      await MongooseRepository.abortTransaction(
        this.session,
      );

      throw error;
    }
  }

  get _roles() {
    if (
      this.data.roles &&
      !Array.isArray(this.data.roles)
    ) {
      return [this.data.roles];
    } else {
      const uniqueRoles = [...new Set(this.data.roles)];
      return uniqueRoles;
    }
  }

  /**
   * Loads the user and validate that it exists.
   */
  async _loadUser() {
    this.user = await UserRepository.findById(
      this.data.id,
      { session: this.session },
    );

    if (!this.user) {
      throw new ValidationError(
        this.language,
        'iam.errors.userNotFound',
      );
    }
  }

  /**
   * Updates the user at the database.
   */
  async _updateAtDatabase() {
    this.user = await UserRepository.update(
      this.data.id,
      this.data,
      {
        currentUser: this.currentUser,
        session: this.session,
      },
    );
  }

  /**
   * Checks if the user is removing it's own owner role
   */
  async _isRemovingOwnOwnerRole() {
    if (this._roles.includes(Roles.values.owner)) {
      return false;
    }

    if (this.data.id !== this.currentUser.id) {
      return false;
    }

    const currentUserRoles = await UserRoleRepository.findAllByUser(
      this.currentUser.id,
    );

    return currentUserRoles.includes(Roles.values.owner);
  }

  async _validate() {
    assert(this.currentUser, 'currentUser is required');
    assert(
      this.currentUser.id,
      'currentUser.id is required',
    );
    assert(
      this.currentUser.email,
      'currentUser.email is required',
    );

    assert(this.data.id, 'id is required');
    assert(this._roles, 'roles is required (can be empty)');

    if (await this._isRemovingOwnOwnerRole()) {
      throw new ValidationError(
        this.language,
        'iam.errors.revokingOwnPermission',
      );
    }
  }
};
