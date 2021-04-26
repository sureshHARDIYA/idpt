import gql from 'graphql-tag'
import graphqlClient from 'modules/shared/graphql/graphqlClient'

export default class AssignmentReponseService {
  static async create (data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ASSIGNMENTS_CREATE(
          $data: AssignmentInput!
        ) {
          assignmentCreate(data: $data) {
            title
            sub_title
          }
        }
      `,
      variables: { data }
    })

    return response.data.assignmentsCreate
  }

  static async submitAssignment (data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
      mutation ASSIGNMENTS_SUBMIT(
        $data: assignmentResponseInput!
      ) {
        assignmentResponseCreate(data: $data) {
          id
        }
      }
      `,
      variables: { data }
    })

    return response
  }

  static async find (id) {
    const response = await graphqlClient.query({
      query: gql`
        query ASSIGNMENTS_FIND($id: String!) {
          assignmentsFind(id: $id) {
            id
            title
            sub_title
            assignment_type
            formSchema {
              type
              label
              field
              options {
                field
                value
                label
              }
              placeholder
              rules {
                required
                message
              }
              formSchema {
                required
                message
              }
            }
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id }
    })

    return response.data.assignmentsFind
  }

  static async list (filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query ASSIGNMENTS_RESPONSE_LIST(
          $limit: Int
          $offset: Int
        ) {
          assignmentResponseList(
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              formData
              assignmentID {
                id
                title
              }
              createdBy {
                id
                fullName
              }
              createdAt
            }
          }
        }
      `,
      variables: { limit, offset }
    })

    return response.data.assignmentResponseList
  }
}
