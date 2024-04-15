import { useAuthenticator } from '@aws-amplify/ui-react-native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

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
export default function OptionsScreen() {
  return (
    <View>
      {' '}
      <SignOutButton></SignOutButton>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {width: '100%', height: '100%', display: 'flex'},
  backgroundImage: {width: '100%', height: '100%'},
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
});
