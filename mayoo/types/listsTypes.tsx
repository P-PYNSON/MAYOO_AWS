export type importedList = {
  id: string;
  name: string;
  recipes:string[];
  ingredients: [ListIngredient];
  createAt: string;
  updateAt: string;
};

export type ListIngredient = {
  checked: string;
  number: number;
  image?: string;
  name: string;
  quantities: string[];
};

export type graphQLReturnedListIngredient = {
  checked: string;
  number: number;
  image?: string;
  name: string;
  quantities: string[];
  __typename: string;
};
