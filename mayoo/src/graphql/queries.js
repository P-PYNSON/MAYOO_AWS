/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      name
      category
      image
      servings
      ingredients {
        image
        name
        quantity
        unit
        __typename
      }
      prepTime
      cookTime
      instructions
      createdAt
      updatedAt
      authors
      __typename
    }
  }
`;
export const listRecipes = /* GraphQL */ `
  query ListRecipes(
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        category
        image
        servings
        ingredients {
          image
          name
          quantity
          unit
          __typename
        }
        prepTime
        cookTime
        instructions
        createdAt
        updatedAt
        authors
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
      id
      name
      ingredients {
        checked
        name
        recipe
        image
        quantity
        unit
        __typename
      }
      createdAt
      updatedAt
      authors
      __typename
    }
  }
`;
export const listLists = /* GraphQL */ `
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        ingredients {
          checked
          name
          recipe
          image
          quantity
          unit
          __typename
        }
        createdAt
        updatedAt
        authors
        __typename
      }
      nextToken
      __typename
    }
  }
`;
