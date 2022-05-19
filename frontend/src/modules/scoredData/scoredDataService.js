import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';
import DataFhirConverter from 'modules/scoredData/dataFhirConverter';

export default class ScoredDataService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation SCOREDDATA_UPDATE(
          $id: String!
          $data: ScoredDataInput!
        ) {
          scoredDataUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.scoredDataUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation SCOREDDATA_DESTROY($ids: [String!]!) {
          scoredDataDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.scoredDataDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation SCOREDDATA_CREATE($data: ScoredDataInput!) {
          scoredDataCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    }).catch((error) => { console.log(JSON.stringify(error, null, 2)); });

    return response.data.scoredDataCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation SCOREDDATA_IMPORT(
          $data: ScoredDataInput!
          $importHash: String!
        ) {
          scoredDataImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.scoredDataImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query SCOREDDATA_FIND($id: String!) {
          scoredDataFind(id: $id) {
            id
            fhir {
              resourceType
              status
              code {
                coding {
                  system
                  display
                }
                text
              }
              subject {
                reference
                type
                display
              }
              effectivePeriod {
                start
                end
              }
              device {
                display
              }
              valueString
              derivedFrom {
                references {
                  reference
                  text
                }
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

    return response.data.scoredDataFind;
  }

  static async list(oldFilter, orderBy, limit, offset) {

    var filter = DataFhirConverter.scoredDataToFhir(oldFilter);
    console.log("fhirFilter");
    console.log(filter);

    const response = await graphqlClient.query({
      query: gql`
        query SCOREDDATA_LIST(
          $filter: ScoredDataFilterInput
          $orderBy: ScoredDataOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          scoredDataList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
              count
              rows {
                id
                fhir {
                  resourceType
                  status
                  code {
                    coding {
                      system
                      display
                    }
                    text
                  }
                  subject {
                    reference
                    type
                    display
                  }
                  effectivePeriod {
                    start
                    end
                  }
                  device {
                    display
                  }
                  valueString
                  derivedFrom {
                    references {
                      reference
                      text
                    }
                  }
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

    var newRows = [];
    for (const row of response.data.scoredDataList.rows) {
      newRows.push(DataFhirConverter.fhirToScoredData(row));
    }
    response.data.scoredDataList.rows = newRows;

    return response.data.scoredDataList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query SCOREDDATA_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          scoredDataAutocomplete(query: $query, limit: $limit) {
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

    return response.data.scoredDataAutocomplete;
  }
}
