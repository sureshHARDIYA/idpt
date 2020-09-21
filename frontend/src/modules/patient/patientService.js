import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class PatientService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PATIENT_UPDATE(
          $id: String!
          $data: PatientInput!
        ) {
          patientUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.patientUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PATIENT_DESTROY($ids: [String!]!) {
          patientDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.patientDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PATIENT_CREATE($data: PatientInput!) {
          patientCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.patientCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PATIENT_IMPORT(
          $data: PatientInput!
          $importHash: String!
        ) {
          patientImport(
            data: $data
            importHash: $importHash
          )
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.patientImport;
  }

  static async find(id, filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query PATIENT_FIND(
          $id: String!
          $filter: RecordFilterInput
          $orderBy: RecordOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          patientFind(id: $id) {
            id
            name
            birthdate
            gender
            user {
              id
              fullName
            }
            phone
            createdAt
            updatedAt

            recordList(
              filter: $filter
              limit: $limit
              offset: $offset
              orderBy: $orderBy
            ) {
              count
              rows {
                id
                description
                status
                state
                createdAt
                updatedAt
                host {
                  id
                  name
                  featuredImage {
                    publicUrl
                  }
                }
                owner {
                  id
                  name
                }
              }
            }
          }
        }
      `,

      variables: {
        id,
        filter,
        orderBy,
        limit,
        offset
      },
    });

    return response.data.patientFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query PATIENT_LIST(
          $filter: PatientFilterInput
          $orderBy: PatientOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          patientList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              name
              birthdate
              gender
              user {
                id
                fullName
              }
              phone
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

    return response.data.patientList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query PATIENT_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          patientAutocomplete(
            query: $query
            limit: $limit
          ) {
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

    return response.data.patientAutocomplete;
  }
}
