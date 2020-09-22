import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class RoadmapService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ROADMAP_UPDATE(
          $id: String!
          $data: RoadmapInput!
        ) {
          roadmapUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.roadmapUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ROADMAP_DESTROY($ids: [String!]!) {
          roadmapDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.roadmapDestroy;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query ROADMAP_FIND($id: String!) {
          roadmapFind(id: $id) {
            record {
              id
              host {
                id
                name
              }
            }
            host {
              id
              name
              featuredImage {
                publicUrl
              }
              description
            }
            children {
              id
              state
              host {
                id
                name
                description
              }

              children {
                id
                state
                host {
                  id
                  name
                }
              }
            }
            state
            completionRequired
            createdAt
            updatedAt
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.roadmapFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query ROADMAP_LIST(
          $filter: AudioFilterInput
          $orderBy: AudioOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          roadmapList(
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

    return response.data.roadmapList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query ROADMAP_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          roadmapAutocomplete(query: $query, limit: $limit) {
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

    return response.data.roadmapAutocomplete;
  }
}
