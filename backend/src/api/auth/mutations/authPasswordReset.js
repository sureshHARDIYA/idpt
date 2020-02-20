const AuthService = require('../../../services/auth/authService');

const schema = `
  authPasswordReset(token: String!, password: String!): Boolean
`;

const resolver = {
  authPasswordReset: async (root, args, context) => {
    await AuthService.passwordReset(
      args.token,
      args.password,
      context,
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
