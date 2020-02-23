import gql from 'graphql-tag'
import graphqlClient from 'modules/shared/graphql/graphqlClient'

export default class VideoService {
  static async update (id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation VIDEO_UPDATE(
          $id: String!
          $data: VideoInput!
        ) {
          videoUpdate(id: $id, data: $data) {
            id
          }
        }
      `,
      variables: { id, data }
    })

    return response.data.videoUpdate
  }

  static async destroyAll (ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation VIDEO_DESTROY($ids: [String!]!) {
          videoDestroy(ids: $ids)
        }
      `,
      variables: { ids }
    })

    return response.data.videoDestroy
  }

  static async create (data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation VIDEO_CREATE($data: VideoInput!) {
          videoCreate(data: $data) {
            id
          }
        }
      `,
      variables: { data }
    })

    return response.data.videoCreate
  }

  static async import (values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation VIDEO_IMPORT(
          $data: VideoInput!
          $importHash: String!
        ) {
          videoImport(data: $data, importHash: $importHash)
        }
      `,
      variables: { data: values, importHash }
    })

    return response.data.videoImport
  }

  static async find (id) {
    const response = await graphqlClient.query({
      query: gql`
        query VIDEO_FIND($id: String!) {
          videoFind(id: $id) {
            id
            url
            videoLength
            evaluationCriteria {
              name
              operator
              requiredWatchTime
            }
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id }
    })

    return response.data.videoFind
  }

  static async list (filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query VIDEO_LIST(
          $filter: VideoFilterInput
          $orderBy: VideoOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          videoList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              url
              videoLength
              evaluationCriteria {
                name
                operator
                requiredWatchTime
              }
              updatedAt
              createdAt
            }
          }
        }
      `,
      variables: { filter, orderBy, limit, offset }
    })

    return response.data.videoList
  }

  static async listAutocomplete (query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query VIDEO_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          videoAutocomplete(query: $query, limit: $limit) {
            id
            label
          }
        }
      `,
      variables: { query, limit }
    })

    return response.data.videoAutocomplete
  }
}
