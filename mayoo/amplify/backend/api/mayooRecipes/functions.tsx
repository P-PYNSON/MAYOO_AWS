import {fetchAuthSession} from 'aws-amplify/auth';
import {getCurrentUser} from 'aws-amplify/auth';

export const shareRecipe = async (
  recipeId: string,
  newAuthorSub: string,
  newAuthorName: string,
) => {
  try {
    const {accessToken, idToken} = (await fetchAuthSession()).tokens ?? {};
    if (idToken) {
      const response = await fetch(
        `https://objk0o7mr9.execute-api.eu-north-1.amazonaws.com/dev/recipes/share`,
        {
          method: 'PUT',
          headers: {cognitoAuthorizer: idToken.toString()},
          body: JSON.stringify({
            recipeId: recipeId,
            newAuthorName: newAuthorName,
            newAuthorSub: newAuthorSub,
          }),
        },
      );

      const responseBody = await response.json();
      const message = responseBody.message;
      console.log(message);
      return message;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const deleteRecipe = async (
  originalRecipeId: string,
  recipeId: string,
) => {
  try {
    const {username, userId} = await getCurrentUser();
    const {accessToken, idToken} = (await fetchAuthSession()).tokens ?? {};
    if (idToken) {
      const response = await fetch(
        `https://objk0o7mr9.execute-api.eu-north-1.amazonaws.com/dev/recipes/delete`,
        {
          method: 'PUT',
          headers: {cognitoAuthorizer: idToken.toString()},
          body: JSON.stringify({
            originalRecipeId: originalRecipeId,
            recipeId: recipeId,
            authorName: username,
          }),
        },
      );

      const responseBody = await response.json();
      const message = responseBody.message;
      console.log(message);
      return message;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
