const UserRepository = require('../../database/repositories/userRepository');
const Roles = require('../../security/roles');
const ValidationError = require('../../errors/validationError');
const bcrypt = require('bcrypt');
const EmailAddressVerificationEmail = require('../../emails/emailAddressVerificationEmail');
const PasswordResetEmail = require('../../emails/passwordResetEmail');
const EmailSender = require('../shared/email/emailSender');
const jwt = require('jsonwebtoken');
const config = require('../../../config')();

const BCRYPT_SALT_ROUNDS = 12;

/**
 * Handles all the Auth operations of the user.
 */
class AuthService {
  /**
   * Signs up with the email and password and returns a JWT token.
   *
   * @param {*} email
   * @param {*} password
   * @param {*} [options]
   */
  static async signup(email, password, options = {}) {
    const existingUser = await this.findByEmail(email);

    // Generates a hashed password to hide the original one.
    const hashedPassword = await bcrypt.hash(
      password,
      BCRYPT_SALT_ROUNDS,
    );

    // The user may already exist on the database in case it was invided.
    if (existingUser) {
      // If the user already have an authenticationUid,
      // it means that it has already signed up
      if (existingUser.authenticationUid) {
        throw new ValidationError(
          options.language,
          'auth.emailAlreadyInUse',
        );
      }

      if (existingUser.disabled) {
        throw new ValidationError(
          options.language,
          'auth.userDisabled',
        );
      }

      /**
       * In case the user exists on the database (was invited)
       * it only creates the new password
       */
      await UserRepository.updatePassword(
        existingUser.id,
        hashedPassword,
      );

      if (EmailSender.isConfigured) {
        await this.sendEmailAddressVerificationEmail(
          options.language,
          existingUser.email,
        );
      }

      const token = jwt.sign(
        { id: existingUser.id },
        config.authJwtSecret,
      );

      return token;
    }

    const isFirstUser =
      (await UserRepository.count()) === 0;

    const newUser = await UserRepository.createFromAuth({
      firstName: email.split('@')[0],
      password: hashedPassword,
      email: email,
      /**
       * If the user is the first user, it's auto set as the owner.
       * New users have no permissions. You can override this behaviour here.
       */
      roles: isFirstUser ? [Roles.values.owner] : [],
    });

    if (EmailSender.isConfigured) {
      await this.sendEmailAddressVerificationEmail(
        options.language,
        newUser.email,
      );
    }

    const token = jwt.sign(
      { id: newUser.id },
      config.authJwtSecret,
    );

    return token;
  }

  /**
   * Signs in a user with the email and password and returns a JWT token.
   * @param {*} email
   * @param {*} password
   * @param {*} [options]
   */
  static async signin(email, password, options = {}) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new ValidationError(
        options.language,
        'auth.userNotFound',
      );
    }

    if (user.disabled) {
      throw new ValidationError(
        options.language,
        'auth.userDisabled',
      );
    }

    if (!user.password) {
      throw new ValidationError(
        options.language,
        'auth.wrongPassword',
      );
    }

    const passwordsMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordsMatch) {
      throw new ValidationError(
        options.language,
        'auth.wrongPassword',
      );
    }

    const token = jwt.sign(
      { id: user.id },
      config.authJwtSecret,
    );

    return token;
  }

  /**
   * Finds the user based on the JWT token.
   *
   * @param {*} token
   */
  static async findByToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        config.authJwtSecret,
        (err, decoded) => {
          if (err) {
            reject(err);
            return;
          }

          const id = decoded.id;
          this.findById(id)
            .then((user) => resolve(user))
            .catch((error) => reject(error));
        },
      );
    });
  }

  /**
   * Finds the user by id.
   *
   * @param {*} id
   */
  static async findById(id) {
    const user = await UserRepository.findByIdWithoutAvatar(
      id,
    );

    if (user && !EmailSender.isConfigured) {
      user.emailVerified = true;
    }

    return user;
  }

  /**
   * Finds the user by email.
   *
   * @param {*} email
   */
  static async findByEmail(email) {
    const user = await UserRepository.findByEmailWithoutAvatar(
      email,
    );

    if (user && !EmailSender.isConfigured) {
      user.emailVerified = true;
    }

    return user;
  }

  /**
   * Finds the user by patient id.
   *
   * @param {*} patient id
   */
  static async findByPatientId(id) {
    const user = await UserRepository.findByPatientIdWithoutAvatar(
      id,
    );

    if (user && !EmailSender.isConfigured) {
      user.emailVerified = true;
    }

    return user;
  }

  /**
   * Sends an email address verification email.
   *
   * @param {*} language
   * @param {*} email
   */
  static async sendEmailAddressVerificationEmail(
    language,
    email,
  ) {
    if (!EmailSender.isConfigured) {
      throw new Error(
        `Email provider is not configured. Please configure it at backend/config/<environment>.json.`,
      );
    }

    let link;
    try {
      const token = await UserRepository.generateEmailVerificationToken(
        email,
      );
      link = `${config.clientUrl}/auth/verify-email?token=${token}`;
    } catch (error) {
      console.error(error);
      throw new ValidationError(
        language,
        'auth.emailAddressVerificationEmail.error',
      );
    }

    const emailAddressVerificationEmail = new EmailAddressVerificationEmail(
      language,
      email,
      link,
    );

    return new EmailSender(
      emailAddressVerificationEmail,
    ).send();
  }

  /**
   * Sends a password reset email.
   *
   * @param {*} language
   * @param {*} email
   */
  static async sendPasswordResetEmail(language, email) {
    if (!EmailSender.isConfigured) {
      throw new Error(
        `Email provider is not configured. Please configure it at backend/config/<environment>.json.`,
      );
    }

    let link;

    try {
      const token = await UserRepository.generatePasswordResetToken(
        email,
      );
      link = `${config.clientUrl}/auth/password-reset?token=${token}`;
    } catch (error) {
      console.error(error);
      throw new ValidationError(
        language,
        'auth.passwordReset.error',
      );
    }

    const passwordResetEmail = new PasswordResetEmail(
      language,
      email,
      link,
    );

    return new EmailSender(passwordResetEmail).send();
  }

  /**
   * Verifies the user email based on the token.
   *
   * @param {*} token
   * @param {*} options
   */
  static async verifyEmail(token, options = {}) {
    const user = await UserRepository.findByEmailVerificationToken(
      token,
      options,
    );

    if (!user) {
      throw new ValidationError(
        options.language,
        'auth.emailAddressVerificationEmail.invalidToken',
      );
    }

    return UserRepository.markEmailVerified(
      user.id,
      options,
    );
  }

  /**
   * Resets the password, validating the password reset token.
   *
   * @param {*} token
   * @param {*} password
   * @param {*} options
   */
  static async passwordReset(
    token,
    password,
    options = {},
  ) {
    const user = await UserRepository.findByPasswordResetToken(
      token,
      options,
    );

    if (!user) {
      throw new ValidationError(
        options.language,
        'auth.passwordReset.invalidToken',
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      BCRYPT_SALT_ROUNDS,
    );

    return UserRepository.updatePassword(
      user.id,
      hashedPassword,
      options,
    );
  }
}

module.exports = AuthService;
