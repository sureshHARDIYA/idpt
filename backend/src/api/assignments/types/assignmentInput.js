const schema = `
  input AssignmentInput {
    title: String!
    sub_title: String
    formSchema: [FormSchemaInput]
  }

  input FormSchemaInput {
    type: questionEnum
    placeholder: String
    label: String!
    field: String!
    rules: [Rule]
    options: [OptionTypeInput]
    formSchema: [Rule]
  }

  input Rule {
    required: Boolean
    message: String! 
  }

  input OptionTypeInput {
    field: String!
    value: String!
    label: String!
  }
`

const resolver = {}

exports.schema = schema
exports.resolver = resolver
