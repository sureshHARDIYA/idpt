const mongoose = require('mongoose');
const PatientService = require('../../../services/patientService');

const schema = `
  type UserWithRoles {
    id: String!
    fullName: String
    firstName: String
    lastName: String
    phoneNumber: String
    email: String!
    avatars: [File!]
    authenticationUid: String
    emailVerified: Boolean
    roles: [String!]!
    disabled: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    patient: Patient
    patientId: String
  }
`;

const resolver = {
  UserWithRoles: {
    patientId: (instance) => {
      if (instance.patient instanceof mongoose.Types.ObjectId) {
        return instance.patient;
      }

      return instance.patient ? instance.patient._id : null
    },
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
