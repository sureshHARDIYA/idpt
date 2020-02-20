import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class DocumentService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation DOCUMENT_UPDATE(
          $id: String!
          $data: DocumentInput!
        ) {
          documentUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.documentUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation DOCUMENT_DESTROY($ids: [String!]!) {
          documentDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.documentDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation DOCUMENT_CREATE($data: DocumentInput!) {
          documentCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.documentCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation DOCUMENT_IMPORT(
          $data: DocumentInput!
          $importHash: String!
        ) {
          documentImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.documentImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query DOCUMENT_FIND($id: String!) {
          documentFind(id: $id) {
            id
            contentHTML
            totalreadtime
            createdAt
            updatedAt
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.documentFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query DOCUMENT_LIST(
          $filter: DocumentFilterInput
          $orderBy: DocumentOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          documentList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              contentHTML
              totalreadtime
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

    return response.data.documentList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query DOCUMENT_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          documentAutocomplete(query: $query, limit: $limit) {
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

    return response.data.documentAutocomplete;
  }
}
