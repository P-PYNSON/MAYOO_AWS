/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $authors: String
  ) {
    onCreateRecipe(filter: $filter, authors: $authors) {
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
      originated
      sharedWith
      authors
      __typename
    }
  }
`;
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $authors: String
  ) {
    onUpdateRecipe(filter: $filter, authors: $authors) {
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
      originated
      sharedWith
      authors
      __typename
    }
  }
`;
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $authors: String
  ) {
    onDeleteRecipe(filter: $filter, authors: $authors) {
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
      originated
      sharedWith
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
  ) {
    onCreateFriendRequest(filter: $filter) {
      id
      token
      firstUserSub
      firstUserName
      secondUserSub
      secondUserName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateFriendRequest = /* GraphQL */ `
  subscription OnUpdateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onUpdateFriendRequest(filter: $filter) {
      id
      token
      firstUserSub
      firstUserName
      secondUserSub
      secondUserName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteFriendRequest = /* GraphQL */ `
  subscription OnDeleteFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onDeleteFriendRequest(filter: $filter) {
      id
      token
      firstUserSub
      firstUserName
      secondUserSub
      secondUserName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateFriends = /* GraphQL */ `
  subscription OnCreateFriends(
    $filter: ModelSubscriptionFriendsFilterInput
    $author: String
  ) {
    onCreateFriends(filter: $filter, author: $author) {
      id
      friendName
      friendSub
      author
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateFriends = /* GraphQL */ `
  subscription OnUpdateFriends(
    $filter: ModelSubscriptionFriendsFilterInput
    $author: String
  ) {
    onUpdateFriends(filter: $filter, author: $author) {
      id
      friendName
      friendSub
      author
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteFriends = /* GraphQL */ `
  subscription OnDeleteFriends(
    $filter: ModelSubscriptionFriendsFilterInput
    $author: String
  ) {
    onDeleteFriends(filter: $filter, author: $author) {
      id
      friendName
      friendSub
      author
      createdAt
      updatedAt
      __typename
    }
  }
`;
