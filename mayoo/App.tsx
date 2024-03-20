/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignInScreen';
import {Authenticator, withAuthenticator} from '@aws-amplify/ui-react-native';
import {ImageBackground} from 'react-native';
import SignInHeader from './components/auth/SignInHeader';

export type RootStackParamList = {
  Home: undefined;
  SignIn: {redirectScreen: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <Authenticator.Provider>
      <Authenticator
        Header={SignInHeader}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Home'}}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{title: 'Sign In'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
