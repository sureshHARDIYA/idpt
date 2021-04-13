import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class TaxonomyService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation TAXONOMY_UPDATE(
          $id: String!
          $data: TaxonomyInput!
        ) {
          taxonomyUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.taxonomyUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation TAXONOMY_DESTROY($ids: [String!]!) {
          taxonomyDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.taxonomyDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation TAXONOMY_CREATE($data: TaxonomyInput!) {
          taxonomyCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.taxonomyCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation TAXONOMY_IMPORT(
          $data: TaxonomyInput!
          $importHash: String!
        ) {
          taxonomyImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.taxonomyImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query TAXONOMY_FIND($id: String!) {
          taxonomyFind(id: $id) {
            id
            name
            parent {
              id
              name
            }
            children {
              id
              name
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

    return response.data.taxonomyFind;
  }

  static async list(filter, orderBy, limit, offset) {
    let response = await graphqlClient.query({
      query: gql`
        query TAXONOMY_LIST(
          $filter: TaxonomyFilterInput
          $orderBy: TaxonomyOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          taxonomyList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              name
              parent {
                id
                name
              }
              children {
                id
                name
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
      
    // Temporary fix for avoiding unnecessary expandable rows
    // because children is a reserved attribute name
    response.data.taxonomyList.rows = response.data.taxonomyList.rows.map(tax => {
      tax.subtaxonomies = tax.children;
      tax.children = [];
      return tax;
    });

    return response.data.taxonomyList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query TAXONOMY_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          taxonomyAutocomplete(query: $query, limit: $limit) {
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

    return response.data.taxonomyAutocomplete;
  }
}
