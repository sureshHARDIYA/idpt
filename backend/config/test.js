const os = require('os');

module.exports = {
  env: 'test',

  database: {
    /**
     * Connection URL for Mongoose
     * See https://mongoosejs.com/docs/index.html
     */
    connection: 'mongodb://localhost:27017/test',
    transactions: false,

    /**
     * In case you want to use ACID transactions, follow this doc:
     * https://mongoosejs.com/docs/transactions.html
     */
    // connection:
    //   'mongodb://localhost:27017,localhost:27018,localhost:27019/development?replicaSet=rs',
    // transactions: true,
  },

  /**
   * Secret used to Sign the JWT (Authentication) tokens.
   */
  authJwtSecret: '<place a generated random value here>',

  /**
   * Directory where uploaded files are saved.
   * Default to temp.
   */
  uploadDir: os.tmpdir(),

  /**
   * Configuration to allow email sending used on:
   * backend/src/services/shared/email/emailSender.js
   *
   * More info: https://nodemailer.com
   */
  email: {
    auth: {
      user: 'mock',
    },
  },

  /**
   * Client URL used when sending emails.
   */
  clientUrl: null,

  /**
   * When this email is set, all requests will automatically authenticate using this email.
   * Leave null for test environment.
   */
  userAutoAuthenticatedEmailForTests: null,


  /**
   * Enables GraphiQL
   * See: https://github.com/graphql/graphiql
   */
  graphiql: false,

};
