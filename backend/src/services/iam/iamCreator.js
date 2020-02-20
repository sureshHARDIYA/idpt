const assert = require('assert');
const InvitationEmail = require('../../emails/invitationEmail');
const ValidationError = require('../../errors/validationError');
const EmailSender = require('../shared/email/emailSender');
const UserRepository = require('../../database/repositories/userRepository');
const MongooseRepository = require('../../database/repositories/mongooseRepository');

/**
 * Handles the creation of the user(s) via the IAM page.
 */
module.exports = class IamCreator {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;

    this.session = null;
    this.emailsToInvite = [];
    this.data = null;
    this.sendInvitationEmails = false;
  }

  /**
   * Creates new user(s) via the IAM page.
   * Sends Invitation Emails if flagged.
   *
   * @param {*} data
   * @param {*} sendInvitationEmails
   */
  async execute(data, sendInvitationEmails = true) {
    this.data = data;
    this.sendInvitationEmails = sendInvitationEmails;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession();

      if (this.emails.length === 1) {
        await this._addOneOfOne();
      } else {
        await this._addOrUpdateMany();
      }

      await MongooseRepository.commitTransaction(
        this.session,
      );
    } catch (error) {
      await MongooseRepository.abortTransaction(
        this.session,
      );
      throw error;
    }

    if (this._hasEmailsToInvite) {
      await this._sendAllInvitationEmails();
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

  get _emails() {
    if (
      this.data.emails &&
      !Array.isArray(this.data.emails)
    ) {
      this.emails = [this.data.emails];
    } else {
      const uniqueEmails = [...new Set(this.data.emails)];
      this.emails = uniqueEmails;
    }

    return this.emails.map((email) => email.trim());
  }

  /**
   * Creates the user with specific profile data
   * when passed only one user.
   * Validates if the user already exists.
   */
  async _addOneOfOne() {
    const email = this.emails[0];

    const exists =
      (await UserRepository.count(
        { email },
        { session: this.session },
      )) > 0;

    if (exists) {
      throw new ValidationError(
        this.language,
        'iam.errors.userAlreadyExists',
      );
    }

    await UserRepository.create(
      {
        ...this.data,
        email,
        roles: this._roles,
      },
      {
        currentUser: this.currentUser,
        session: this.session,
      },
    );

    this.emailsToInvite.push(email);
  }

  /**
   * Creates or updates many users at once.
   */
  async _addOrUpdateMany() {
    return Promise.all(
      this.emails.map((email) =>
        this._addOrUpdateOneOfMany(email),
      ),
    );
  }

  /**
   * Creates or updates the user passed.
   * If the user already exists, it only adds the role to the user.
   *
   * @param {*} email
   */
  async _addOrUpdateOneOfMany(email) {
    let user = await UserRepository.findByEmailWithoutAvatar(
      email,
      {
        session: this.session,
      },
    );

    if (user) {
      await UserRepository.updateRoles(
        user.id,
        this._roles,
        {
          addRoles: true,
          currentUser: this.currentUser,
          session: this.session,
        },
      );
    } else {
      await UserRepository.create(
        { email, roles: this._roles },
        {
          currentUser: this.currentUser,
          session: this.session,
        },
      );

      this.emailsToInvite.push(email);
    }
  }

  /**
   * Verifies if there are emails to invite.
   */
  get _hasEmailsToInvite() {
    return (
      this.emailsToInvite && this.emailsToInvite.length
    );
  }

  /**
   * Sends all invitation emails.
   */
  async _sendAllInvitationEmails() {
    if (!this.sendInvitationEmails) {
      return;
    }

    return Promise.all(
      this.emailsToInvite.map((emailToInvite) => {
        const invitationEmail = new InvitationEmail(
          this.language,
          emailToInvite,
        );

        return new EmailSender(invitationEmail).send();
      }),
    );
  }

  /**
   * Validates the user(s) data.
   */
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
      this._emails && this._emails.length,
      'emails is required',
    );

    assert(
      this._roles && this._roles.length,
      'roles is required',
    );
  }
};
