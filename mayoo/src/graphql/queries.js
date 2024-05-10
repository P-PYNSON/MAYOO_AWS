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
      recipes
      ingredients {
        checked
        number
        image
        name
        quantities
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
        recipes
        ingredients {
          checked
          number
          image
          name
          quantities
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
export const getFriendRequest = /* GraphQL */ `
  query GetFriendRequest($id: ID!) {
    getFriendRequest(id: $id) {
      id
      token
      targetEmail
      author
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFriendRequests = /* GraphQL */ `
  query ListFriendRequests(
    $filter: ModelFriendRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        token
        targetEmail
        author
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFriendList = /* GraphQL */ `
  query GetFriendList($id: ID!) {
    getFriendList(id: $id) {
      id
      friendId
      friendEmail
      author
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFriendLists = /* GraphQL */ `
  query ListFriendLists(
    $filter: ModelFriendListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        friendId
        friendEmail
        author
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
