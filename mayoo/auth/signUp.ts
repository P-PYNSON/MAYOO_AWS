import { signUp } from 'aws-amplify/auth';

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

export async function handleSignUp({
  username,
  password,
  email,
}: SignUpParameters) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
        },
        // optional
        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      }
    });
    console.log(nextStep);
    console.log('user registration started');
    console.log(isSignUpComplete);
    console.log(userId);
  } catch (error) {
    console.log('error signing up:', error);
    
  }
}