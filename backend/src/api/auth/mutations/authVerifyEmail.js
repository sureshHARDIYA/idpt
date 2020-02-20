const AuthService = require('../../../services/auth/authService');

const schema = `
  authVerifyEmail(token: String!): Boolean
`;

const resolver = {
  authVerifyEmail: async (root, args, context) => {
    return AuthService.verifyEmail(args.token, context);
  },
};

exports.schema = schema;
exports.resolver = resolver;
