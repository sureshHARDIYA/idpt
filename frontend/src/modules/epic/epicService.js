import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class EpicService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation EPIC_UPDATE(
          $id: String!
          $data: EpicInput!
        ) {
          epicUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.epicUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation EPIC_DESTROY($ids: [String!]!) {
          epicDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.epicDestroy;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query EPIC_FIND($id: String!) {
          epicFind(id: $id) {
            id
            state
            completionRequired
            roadmap {
              id
              host {
                id
                name
              }

              record {
                id
                host {
                  id
                  name
                }
              }
            }
            host {
              id
              name
            }
            children {
              id
              state
              host {
                id
                name
              }
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

    return response.data.epicFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query EPIC_LIST(
          $filter: AudioFilterInput
          $orderBy: AudioOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          epicList(
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

    return response.data.epicList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query EPIC_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          epicAutocomplete(query: $query, limit: $limit) {
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

    return response.data.epicAutocomplete;
  }
}
