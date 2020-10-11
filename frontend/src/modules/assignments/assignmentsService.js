import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class AssignmentsService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ASSIGNMENTS_UPDATE(
          $id: String!
          $data: AssignmentInput!
        ) {
          assignmentUpdate(id: $id, data: $data) {
            id
          }
        }
      `,
      variables: { id, data },
    });

    return response.data.assignmentUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ASSIGNMENTS_DESTROY($ids: [String!]!) {
          assignmentsDestroy(ids: $ids)
        }
      `,
      variables: { ids },
    });

    return response.data.assignmentsDestroy;
  }

  static async create(data) {
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
      variables: { data },
    });

    return response.data.assignmentsCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ASSIGNMENTS_IMPORT(
          $data: AssignmentInput!
          $importHash: String!
        ) {
          assignmentsImport(
            data: $data
            importHash: $importHash
          )
        }
      `,
      variables: { data: values, importHash },
    });

    return response.data.assignmentsImport;
  }

  static async find(id) {
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
      variables: { id },
    });

    return response.data.assignmentsFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query ASSIGNMENTS_LIST(
          $filter: AssignmentsFilterInput
          $orderBy: AssignmentsOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          assignmentsList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              title
              sub_title
              formSchema {
                type
                label
                field
              }
              createdBy {
                id
                fullName
              }
              createdAt
              updatedAt
            }
          }
        }
      `,
      variables: { filter, orderBy, limit, offset },
    });

    return response.data.assignmentsList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query ASSIGNMENTS_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          assignmentsAutocomplete(
            query: $query
            limit: $limit
          ) {
            id
            label
          }
        }
      `,
      variables: { query, limit },
    });

    return response.data.assignmentsAutocomplete;
  }
}
