import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class RecordService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation RECORD_UPDATE(
          $id: String!
          $data: RecordInput!
        ) {
          recordUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.recordUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation RECORD_DESTROY($ids: [String!]!) {
          recordDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.recordDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation RECORD_CREATE($data: RecordInput!) {
          recordCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.recordCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation RECORD_IMPORT(
          $data: RecordInput!
          $importHash: String!
        ) {
          recordImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.recordImport;
  }

  static async find(id, options) {
    const response = await graphqlClient.query({
      query: gql`
        query RECORD_FIND(
          $id: String!
          $options: RoadmapOption
        ) {
          recordFind(id: $id, options: $options) {
            id
            description
            status
            state
            createdAt
            updatedAt
            host {
              id
              name
            }
            owner {
              id
              fullName
            }
            roadmaps {
              id
              host {
                id
                name
                featuredImage {
                  publicUrl
                }
              }
              state
              completionRequired
              children {
                id
                host {
                  id
                  name

                  next {
                    id
                    name
                  }
                }
                __typename
                state
                completionRequired
                children {
                  id
                  host {
                    id
                    name

                    next {
                      id
                      name
                    }
                  }
                  state
                  completionRequired
                  __typename
                }
              }
              __typename
            }
          }
        }
      `,

      variables: {
        id,
        options,
      },
    });

    return response.data.recordFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query RECORD_LIST(
          $filter: RecordFilterInput
          $orderBy: RecordOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          recordList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              description
              status
              state
              createdAt
              updatedAt
              host {
                id
                name
              }
              owner {
                id
                fullName
              }
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

    return response.data.recordList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query RECORD_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          recordAutocomplete(query: $query, limit: $limit) {
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

    return response.data.recordAutocomplete;
  }

  static async findModule(id) {
    const response = await graphqlClient.query({
      query: gql`
        query RECORD_MODULE_FIND($id: String!) {
          recordModuleFind(id: $id) {
            id
            host {
              id
              name
            }
            state
            completionRequired
            children {
              id
              host {
                id
                name

                next {
                  id
                  name
                }
              }
              __typename
              state
              completionRequired
              children {
                id
                host {
                  id
                  name

                  next {
                    id
                    name
                  }
                }
                state
                completionRequired
                __typename
              }
            }
            __typename
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.recordModuleFind;
  }
}
