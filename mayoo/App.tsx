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
import {
  Authenticator,
} from '@aws-amplify/ui-react-native';
import SignInHeader from './components/auth/SignInHeader';
import AppHeader from './components/AppHeader';
import {importedRecipe, newRecipe} from './types/recipeTypes';
import CreateRecipe from './screens/CreateRecipe';
import RecipesList from './screens/RecipesList';
import ShowRecipe from './screens/ShowRecipe';

export type RootStackParamList = {
  SignIn: {redirectScreen: string};
  Options: undefined;
  Home: undefined;
  CreateRecipe: undefined;
  ShowRecipe: {id:string};
  UpdateRecipe: {recipe: newRecipe};
  RecipesList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <Authenticator.Provider>
      <Authenticator Header={SignInHeader}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerTitle: props => <AppHeader />}}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{title: 'Sign In'}}
            />
            <Stack.Screen
              name="CreateRecipe"
              component={CreateRecipe}
              options={{title: 'Create recipe'}}
            />
            <Stack.Screen
              name="RecipesList"
              component={RecipesList}
              options={{title: 'All my recipes :3'}}
            />
            <Stack.Screen
              name="ShowRecipe"
              component={ShowRecipe}
              options={{title: 'Yummy 😋'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
