/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      name
      ingredients {
        image
        name
        quantity
        unit
        __typename
      }
      instructions
      category
      prepTime
      cookTime
      servings
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
        ingredients {
          image
          name
          quantity
          unit
          __typename
        }
        instructions
        category
        prepTime
        cookTime
        servings
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

export const filterByIngredient = /* GraphQL */ `
  query filterByIngredient(
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
    $ingredientName: String
  ) {
    listRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        ingredients(filter: {name: {contains: $ingredientName}}) {
          image
          name
          quantity
          unit
          __typename
        }
        instructions
        category
        prepTime
        cookTime
        servings
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
