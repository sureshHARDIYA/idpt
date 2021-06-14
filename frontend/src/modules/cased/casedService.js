import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class CasedService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation CASED_UPDATE(
          $id: String!
          $data: CasedInput!
        ) {
          casedUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.casedUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation CASED_DESTROY($ids: [String!]!) {
          casedDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.casedDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation CASED_CREATE($data: CasedInput!) {
          casedCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.casedCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation CASED_IMPORT(
          $data: CasedInput!
          $importHash: String!
        ) {
          casedImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.casedImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query CASED_FIND($id: String!) {
          casedFind(id: $id) {
            id
            name
            description
            status
            featuredImage {
              id
              name
              sizeInBytes
              publicUrl
              privateUrl
            }
            modules {
              id
              name
            }
            audience
            audienceList
            availableFrom
            createdAt
            updatedAt
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.casedFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query CASED_LIST(
          $filter: CasedFilterInput
          $orderBy: CasedOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          casedList(
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
              featuredImage {
                id
                name
                sizeInBytes
                publicUrl
                privateUrl
              }
              audience
              audienceList
              modules {
                id
                name
              }
              availableFrom
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

    return response.data.casedList;
  }

  static async graph() {
    const response = await graphqlClient.query({
      query: gql`
        query CASED_GRAPH {
          casedGraph {
            count
            rows {
              id
              name
              status
              modules {
                id
              }
            }
          }
        }
      `,
    });

    return response.data.casedGraph;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query CASED_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          casedAutocomplete(query: $query, limit: $limit) {
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

    return response.data.casedAutocomplete;
  }
}
