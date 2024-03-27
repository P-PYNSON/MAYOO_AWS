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
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe(
    $input: UpdateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    updateRecipe(input: $input, condition: $condition) {
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
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe(
    $input: DeleteRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    deleteRecipe(input: $input, condition: $condition) {
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
