import {fetchAuthSession} from 'aws-amplify/auth';

export async function fetchSpoon(text:string) {
    try {
      const {accessToken, idToken} = (await fetchAuthSession()).tokens ?? {};    
      if (idToken != undefined) {
       /*  console.log(idToken.toString()); */
        const response = await fetch(
          `https://fd3gcmobm4.execute-api.eu-north-1.amazonaws.com/dev/spoonacular/${text}`,
          {
            method: 'GET',
            headers: {AuthorizationPool: idToken.toString()},
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }