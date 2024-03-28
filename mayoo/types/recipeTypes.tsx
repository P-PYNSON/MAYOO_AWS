export type newRecipe = {
  name: string;
  category?: string;
  image?: string;
  servings?: number;
  ingredients: Ingredient;
  prepTime?: number;
  cookTime?: number;
  instructions?: string[];
};

export type importedRecipe = {
  id: string;
  recipe: newRecipe;
  createAt: string;
  updateAt: string;
};

export type Ingredient = {
  image?: string;
  name: string;
  quantity: number;
  unit: string;
};


