/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecipe = /* GraphQL */ `
  mutation CreateRecipe(
    $input: CreateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    createRecipe(input: $input, condition: $condition) {
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
      sharedWith
      authors
      __typename
    }
  }
`;
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe(
    $input: UpdateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    updateRecipe(input: $input, condition: $condition) {
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
      sharedWith
      authors
      __typename
    }
  }
`;
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe(
    $input: DeleteRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    deleteRecipe(input: $input, condition: $condition) {
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
      sharedWith
      authors
      __typename
    }
  }
`;
export const createList = /* GraphQL */ `
  mutation CreateList(
    $input: CreateListInput!
    $condition: ModelListConditionInput
  ) {
    createList(input: $input, condition: $condition) {
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
export const updateList = /* GraphQL */ `
  mutation UpdateList(
    $input: UpdateListInput!
    $condition: ModelListConditionInput
  ) {
    updateList(input: $input, condition: $condition) {
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
export const deleteList = /* GraphQL */ `
  mutation DeleteList(
    $input: DeleteListInput!
    $condition: ModelListConditionInput
  ) {
    deleteList(input: $input, condition: $condition) {
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
export const createFriendRequest = /* GraphQL */ `
  mutation CreateFriendRequest(
    $input: CreateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    createFriendRequest(input: $input, condition: $condition) {
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
export const updateFriendRequest = /* GraphQL */ `
  mutation UpdateFriendRequest(
    $input: UpdateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    updateFriendRequest(input: $input, condition: $condition) {
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
export const deleteFriendRequest = /* GraphQL */ `
  mutation DeleteFriendRequest(
    $input: DeleteFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    deleteFriendRequest(input: $input, condition: $condition) {
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
export const createFriends = /* GraphQL */ `
  mutation CreateFriends(
    $input: CreateFriendsInput!
    $condition: ModelFriendsConditionInput
  ) {
    createFriends(input: $input, condition: $condition) {
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
export const updateFriends = /* GraphQL */ `
  mutation UpdateFriends(
    $input: UpdateFriendsInput!
    $condition: ModelFriendsConditionInput
  ) {
    updateFriends(input: $input, condition: $condition) {
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
export const deleteFriends = /* GraphQL */ `
  mutation DeleteFriends(
    $input: DeleteFriendsInput!
    $condition: ModelFriendsConditionInput
  ) {
    deleteFriends(input: $input, condition: $condition) {
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
