/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe($filter: ModelSubscriptionRecipeFilterInput) {
    onCreateRecipe(filter: $filter) {
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
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe($filter: ModelSubscriptionRecipeFilterInput) {
    onUpdateRecipe(filter: $filter) {
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
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe($filter: ModelSubscriptionRecipeFilterInput) {
    onDeleteRecipe(filter: $filter) {
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
export const onCreateList = /* GraphQL */ `
  subscription OnCreateList($filter: ModelSubscriptionListFilterInput) {
    onCreateList(filter: $filter) {
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
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList($filter: ModelSubscriptionListFilterInput) {
    onUpdateList(filter: $filter) {
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
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList($filter: ModelSubscriptionListFilterInput) {
    onDeleteList(filter: $filter) {
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
export const onCreateFriendRequest = /* GraphQL */ `
  subscription OnCreateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
    $author: String
  ) {
    onCreateFriendRequest(filter: $filter, author: $author) {
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
export const onUpdateFriendRequest = /* GraphQL */ `
  subscription OnUpdateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
    $author: String
  ) {
    onUpdateFriendRequest(filter: $filter, author: $author) {
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
export const onDeleteFriendRequest = /* GraphQL */ `
  subscription OnDeleteFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
    $author: String
  ) {
    onDeleteFriendRequest(filter: $filter, author: $author) {
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
export const onCreateFriendList = /* GraphQL */ `
  subscription OnCreateFriendList(
    $filter: ModelSubscriptionFriendListFilterInput
    $author: String
  ) {
    onCreateFriendList(filter: $filter, author: $author) {
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
export const onUpdateFriendList = /* GraphQL */ `
  subscription OnUpdateFriendList(
    $filter: ModelSubscriptionFriendListFilterInput
    $author: String
  ) {
    onUpdateFriendList(filter: $filter, author: $author) {
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
export const onDeleteFriendList = /* GraphQL */ `
  subscription OnDeleteFriendList(
    $filter: ModelSubscriptionFriendListFilterInput
    $author: String
  ) {
    onDeleteFriendList(filter: $filter, author: $author) {
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
