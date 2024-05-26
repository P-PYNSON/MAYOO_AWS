import {fetchAuthSession} from 'aws-amplify/auth';
import {getCurrentUser} from 'aws-amplify/auth';

export async function fetchRecipes(filter: string, page: string | undefined) {
  try {
    const {accessToken, idToken} = (await fetchAuthSession()).tokens ?? {};
    const {username, userId} = await getCurrentUser();
    if (idToken != undefined) {
      const response = await fetch(
        `https://bvlx969se6.execute-api.eu-north-1.amazonaws.com/dev/recipes/${userId}::${username}/${filter}/${page}`,
        {
          method: 'GET',
          headers: {cognitoAuthorizer: idToken.toString()},
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
