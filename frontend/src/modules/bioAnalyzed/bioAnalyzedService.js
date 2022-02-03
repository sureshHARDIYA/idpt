import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class BioAnalyzedService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BIOANALYZED_UPDATE(
          $id: String!
          $data: BioAnalyzedInput!
        ) {
          bioAnalyzedUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.bioAnalyzedUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BIOANALYZED_DESTROY($ids: [String!]!) {
          bioAnalyzedDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.bioAnalyzedDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BIOANALYZED_CREATE($data: BioAnalyzedInput!) {
          bioAnalyzedCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    }).catch((error) => { console.log(JSON.stringify(error, null, 2)); });

    return response.data.bioAnalyzedCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BIOANALYZED_IMPORT(
          $data: BioAnalyzedInput!
          $importHash: String!
        ) {
          bioAnalyzedImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.bioAnalyzedImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query BIOANALYZED_FIND($id: String!) {
          bioAnalyzedFind(id: $id) {
            id
            type
            score
            timeStart
            timeEnd
            patient
            createdAt
            updatedAt
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.bioAnalyzedFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query BIOANALYZED_LIST(
          $filter: BioAnalyzedFilterInput
          $orderBy: BioAnalyzedOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          bioAnalyzedList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              type
              score
              timeStart
              timeEnd
              patient
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

    return response.data.bioAnalyzedList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query BIOANALYZED_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          bioAnalyzedAutocomplete(query: $query, limit: $limit) {
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

    return response.data.bioAnalyzedAutocomplete;
  }
}
