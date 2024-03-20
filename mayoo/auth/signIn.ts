import {signIn, type SignInInput} from 'aws-amplify/auth';


export async function handleSignIn({username, password}: SignInInput) {
  try {
    const {isSignedIn, nextStep} = await signIn({username, password});
    console.log(nextStep);  
    return nextStep;
  } catch (error) {
    console.log('error signing in', error);
    return false;
  }
}
