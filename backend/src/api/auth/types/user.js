const mongoose = require('mongoose');
const PatientService = require('../../../services/patientService');

const schema = `
  type User {
    id: String!
    fullName: String
    firstName: String
    lastName: String
    phoneNumber: String
    email: String!
    avatars: [File!]
    authenticationUid: String
    emailVerified: Boolean
    disabled: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    patient: Patient
  }
`;

const resolver = {
  User: {
    patient: async (instance, _, context) => {
      if (instance.patient instanceof mongoose.Types.ObjectId) {
        return await new PatientService(context).findById(instance.patient)
      }

      return instance;
    }
  }
};

exports.schema = schema;
exports.resolver = resolver;
