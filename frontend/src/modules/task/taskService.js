import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class TaskService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation TASK_UPDATE(
          $id: String!
          $data: TaskInput!
        ) {
          taskUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.taskUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation TASK_DESTROY($ids: [String!]!) {
          taskDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.taskDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation TASK_CREATE($data: TaskInput!) {
          taskCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.taskCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation TASK_IMPORT(
          $data: TaskInput!
          $importHash: String!
        ) {
          taskImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.taskImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query TASK_FIND($id: String!) {
          taskFind(id: $id) {
            id
            name
            description
            status
            tags
            points
            completionRequired
            complexityLevel
            type
            owner {
              id
              name
            }
            next {
              id
              name
            }
            elements {
              id
              contentHTML
            }
            createdAt
            updatedAt
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.taskFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query TASK_LIST(
          $filter: TaskFilterInput
          $orderBy: TaskOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          taskList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              name
              description
              status
              tags
              points
              completionRequired
              complexityLevel
              type
              owner {
                id
                name
              }
              elements {
                id
                contentHTML
              }
              updatedAt
              createdAt
            }
          }
        }
      `,

      variables: {
        filter,
        orderBy,
        limit,
        offset,
      },
    });

    return response.data.taskList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query TASK_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          taskAutocomplete(query: $query, limit: $limit) {
            id
            label
          }
        }
      `,

      variables: {
        query,
        limit,
      },
    });

    return response.data.taskAutocomplete;
  }
}
