const schema = `
 type Assignment {
   id: String!
   title: String!
   sub_title: String
   assignment_type: AssignmentTypeEnum
   owner: [Task!]
   formSchema: [FormSchema]
   createdAt: DateTime
   createdBy: User
   updatedAt: DateTime
 }

 type FormSchema {
   type: QuestionEnum
   placeholder: String
   label: String!
   field: String!
   rules: [RuleType]
   options: [OptionType]
   formSchema: [RuleType]
 }

 type OptionType {
   field: String!
   value: String!
   label: String!
 }

 type RuleType {
   required: Boolean
   message: String!
 }
`;

const resolver = {};

exports.schema = schema;

exports.resolver = resolver;
