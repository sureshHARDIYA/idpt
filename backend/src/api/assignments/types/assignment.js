const schema = `
 type Assignment {
   id: String!
   title: String!
   sub_title: String
   questions: [Questions]
   publish_survey: Boolean
   createdAt: DateTime
   createdBy: User
   updatedAt: DateTime
 }

 type Questions {
   title: String!
   _id: String!
   type: optionEnum
   options: [Options]
   placeholder: String
 }

 type Options {
   content: String!
   _id:  String!
 }
`;

const resolver = {};

exports.schema = schema;

exports.resolver = resolver;
