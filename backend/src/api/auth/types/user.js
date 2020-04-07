const mongoose = require('mongoose');
const UserService = require('../../../services/auth/authService');
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
    patientId: String
  }
`;

const resolver = {
  User: {
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
  },
  Patient: {
    user: async (instance, _, context) => {
      return await UserService.findByPatientId(instance.id, context)
    }
  }
};

exports.schema = schema;
exports.resolver = resolver;
