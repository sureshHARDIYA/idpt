import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class BioDataService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BIODATA_UPDATE(
          $id: String!
          $data: BioDataInput!
        ) {
          bioDataUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.bioDataUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BIODATA_DESTROY($ids: [String!]!) {
          bioDataDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.bioDataDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BIODATA_CREATE($data: BioDataInput!) {
          bioDataCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    }).catch((error) => { console.log(JSON.stringify(error, null, 2)); });

    return response.data.bioDataCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BIODATA_IMPORT(
          $data: BioDataInput!
          $importHash: String!
        ) {
          bioDataImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.bioDataImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query BIODATA_FIND($id: String!) {
          bioDataFind(id: $id) {
            id
            type
            frequency
            timestamp
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

    return response.data.bioDataFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query BIODATA_LIST(
          $filter: BioDataFilterInput
          $orderBy: BioDataOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          bioDataList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              type
              timestamp
              patient
              frequency
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

    return response.data.bioDataList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query BIODATA_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          bioDataAutocomplete(query: $query, limit: $limit) {
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

    return response.data.bioDataAutocomplete;
  }
}
