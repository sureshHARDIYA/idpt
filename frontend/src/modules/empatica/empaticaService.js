import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class EmpaticaService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation EMPATICA_UPDATE(
          $id: String!
          $data: EmpaticaInput!
        ) {
          empaticaUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.empaticaUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation EMPATICA_DESTROY($ids: [String!]!) {
          empaticaDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.empaticaDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation EMPATICA_CREATE($data: EmpaticaInput!) {
          empaticaCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    }).catch((error) => { console.log(JSON.stringify(error, null, 2)); });

    return response.data.empaticaCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation EMPATICA_IMPORT(
          $data: EmpaticaInput!
          $importHash: String!
        ) {
          empaticaImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.empaticaImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query EMPATICA_FIND($id: String!) {
          empaticaFind(id: $id) {
            id
            type
            frequency
            timestamp
            patient {
              id
              fullName
            }
            data
            createdAt
            updatedAt
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.empaticaFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query EMPATICA_LIST(
          $filter: EmpaticaFilterInput
          $orderBy: EmpaticaOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          empaticaList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              name
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

    return response.data.empaticaList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query EMPATICA_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          empaticaAutocomplete(query: $query, limit: $limit) {
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

    return response.data.empaticaAutocomplete;
  }
}
