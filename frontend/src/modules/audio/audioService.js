import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class AudioService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUDIO_UPDATE(
          $id: String!
          $data: AudioInput!
        ) {
          audioUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.audioUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUDIO_DESTROY($ids: [String!]!) {
          audioDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.audioDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUDIO_CREATE($data: AudioInput!) {
          audioCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.audioCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUDIO_IMPORT(
          $data: AudioInput!
          $importHash: String!
        ) {
          audioImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.audioImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query AUDIO_FIND($id: String!) {
          audioFind(id: $id) {
            id
            url
            audiolength
            createdAt
            updatedAt
            evaluationCriteria {
              field
              operator
              valueRequired
            }
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.audioFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query AUDIO_LIST(
          $filter: AudioFilterInput
          $orderBy: AudioOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          audioList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              url
              audiolength
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

    return response.data.audioList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query AUDIO_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          audioAutocomplete(query: $query, limit: $limit) {
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

    return response.data.audioAutocomplete;
  }
}
