import {
  useAuthenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react-native';
import {fetchAuthSession, getCurrentUser} from 'aws-amplify/auth';
import React, {useEffect} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';

const userSelector = (context: {user: any}) => [context.user];

const SignOutButton = () => {
  const {user, signOut} = useAuthenticator(userSelector);
  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        Hello, {user.username}! Click here to sign out!
      </Text>
    </Pressable>
  );
};

const HomeScreen = () => {
  useEffect(() => {
    async function currentAuthenticatedUser() {
      try {
        const {username} = await getCurrentUser();
        console.log(`Current username: ${username}`);
      } catch (err) {
        console.log('error', err);
      }
    }

    /*  async function currentSession() {
      try {
        const {accessToken, idToken} = (await fetchAuthSession()).tokens ?? {};
        console.log(`access token: ${accessToken}`);
      } catch (err) {
        console.log(err);
      }
    } */

    currentAuthenticatedUser();
    /* currentSession(); */
  }, []);
  return (
    <ImageBackground source={require('../assets/images/background.png')} style={styles.backgroundImage}>
      <View>
        <Text>Hello</Text>
        <SignOutButton></SignOutButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
  backgroundImage:{width:'100%', height:'100%'}
});

export default HomeScreen;
