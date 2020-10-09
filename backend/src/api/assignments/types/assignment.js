const schema = `
 type Assignment {
   id: String!
   title: String!
   sub_title: String
   formSchema: [FormSchema]
   createdAt: DateTime
   createdBy: User
   updatedAt: DateTime
 }

 type FormSchema {
   type: questionEnum
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
`

const resolver = {}

exports.schema = schema

exports.resolver = resolver
