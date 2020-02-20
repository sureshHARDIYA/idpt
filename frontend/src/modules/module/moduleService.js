import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class ModuleService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation MODULE_UPDATE(
          $id: String!
          $data: ModuleInput!
        ) {
          moduleUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.moduleUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation MODULE_DESTROY($ids: [String!]!) {
          moduleDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.moduleDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation MODULE_CREATE($data: ModuleInput!) {
          moduleCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.moduleCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation MODULE_IMPORT(
          $data: ModuleInput!
          $importHash: String!
        ) {
          moduleImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.moduleImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query MODULE_FIND($id: String!) {
          moduleFind(id: $id) {
            id
            owner {
              id
              name
            }
            name
            description
            status
            tasks {
              id
              name
            }
            featuredImage {
              id
              name
              sizeInBytes
              publicUrl
              privateUrl
            }
            prerequisite {
              id
              name
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

    return response.data.moduleFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query MODULE_LIST(
          $filter: ModuleFilterInput
          $orderBy: ModuleOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          moduleList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              owner {
                id
                name
              }
              name
              description
              status
              tasks {
                id
                name
              }
              featuredImage {
                id
                name
                sizeInBytes
                publicUrl
                privateUrl
              }
              prerequisite {
                id
                name
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

    return response.data.moduleList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query MODULE_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          moduleAutocomplete(query: $query, limit: $limit) {
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

    return response.data.moduleAutocomplete;
  }
}
