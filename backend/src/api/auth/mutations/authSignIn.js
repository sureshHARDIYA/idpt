const AuthService = require('../../../services/auth/authService');

const schema = `
  authSignIn(email: String!, password: String!): String
`;

const resolver = {
  authSignIn: async (root, args, context) => {
    return AuthService.signin(
      args.email,
      args.password,
      context,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
