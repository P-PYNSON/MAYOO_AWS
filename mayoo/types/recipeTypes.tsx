export type newRecipe = {
  name: string;
  category?: string;
  image?: string;
  servings?: number;
  ingredients: Ingredient[];
  prepTime?: number;
  cookTime?: number;
  instructions?: string[];
};

export type importedRecipe = {
  id: string;
  name: string;
  category?: string;
  image?: string;
  servings?: number;
  ingredients: Ingredient[];
  prepTime?: number;
  cookTime?: number;
  instructions?: string[];
  createAt: string;
  updateAt: string;
};

export type updatedRecipe = {
  id: string;
  name: string;
  category?: string;
  image?: string;
  servings?: number;
  ingredients: Ingredient[];
  prepTime?: number;
  cookTime?: number;
  instructions?: string[];
};

export type Ingredient = {
  image?: string;
  name: string;
  quantity: number;
  unit: string;
};

export type graphQlReturnedIngredient = {
  image?: string;
  name: string;
  quantity: number;
  unit: string;
  __typename:string;
};
