module.exports = {
  env: 'production',

  database: {
    /**
     * Connection URL for Mongoose
     * See https://mongoosejs.com/docs/index.html
     */
    connection:
      process.env.MONGODB_URI ||
      'mongodb://mongo:27017/production',
    /**
     * In case you want to use ACID transactions, change this flag to true.
     * See: https://mongoosejs.com/docs/transactions.html
     */
    transactions: false,
  },

  /**
   * Secret used to Sign the JWT (Authentication) tokens.
   */
  authJwtSecret: '<place a generated random value here>',

  /**
   * Directory where uploaded files are saved.
   * Default to the storage volume: /storage.
   * See /docker-compose.yml
   */
  uploadDir: '/storage',

  /**
   * Configuration to allow email sending used on:
   * backend/src/services/shared/email/emailSender.js
   *
   * More info: https://nodemailer.com
   */
  email: {
    from: '<insert your email here>',
    host: null,
    auth: {
      user: null,
      pass: null,
    },
  },

  /**
   * Client URL used when sending emails.
   */
  clientUrl: '<insert client url here>',

  /**
   * Enables GraphiQL
   * See: https://github.com/graphql/graphiql
   */
  graphiql: false,
};
