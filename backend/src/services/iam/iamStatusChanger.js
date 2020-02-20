const UserRepository = require('../../database/repositories/userRepository');
const assert = require('assert');
const ValidationError = require('../../errors/validationError');
const MongooseRepository = require('../../database/repositories/mongooseRepository');

/**
 * Handles changing the status (enabled/disabeld) of the Users.
 */
module.exports = class IamStatusChanger {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;
    this.session = null;
  }

  async changeStatus(data) {
    this.data = data;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession();

      await this._loadUsers();
      await this._changeAtDatabase();
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

  get _ids() {
    if (this.data.ids && !Array.isArray(this.data.ids)) {
      return [this.data.ids];
    } else {
      const uniqueIds = [...new Set(this.data.ids)];
      return uniqueIds;
    }
  }

  get _disabled() {
    return !!this.data.disabled;
  }

  async _loadUsers() {
    this.users = await UserRepository.findAllByDisabled(
      this._ids,
      !this._disabled,
      { session: this.session },
    );
  }

  async _changeAtDatabase() {
    for (const user of this.users) {
      await UserRepository.updateStatus(
        user.id,
        this._disabled,
        {
          session: this.session,
          currentUser: this.currentUser,
        },
      );
    }
  }

  async _isDisablingHimself() {
    return (
      this._disabled &&
      this._ids.includes(this.currentUser.id)
    );
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

    assert(
      this._ids && this._ids.length,
      'ids is required',
    );

    if (await this._isDisablingHimself()) {
      throw new ValidationError(
        this.language,
        'iam.errors.disablingHimself',
      );
    }
  }
};
