import {
  useAuthenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react-native';
import {fetchAuthSession, getCurrentUser} from 'aws-amplify/auth';
import React, {useEffect} from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Amplify from 'aws-amplify';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from '../src/graphql/mutations';
import {
  listRecipes,
  getRecipe,
  filterByIngredient,
} from '../src/graphql/queries';

const client = generateClient();

const HomeScreen = () => {
  useEffect(() => {}, []);

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.allRecipesView}>
          <Text>My recipes</Text>
        </View>
        <View style={styles.newRecipeView}></View>
        <View style={styles.listsView}></View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {width: '100%', height: '100%'},
  scrollview: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap:20,
  },
  allRecipesView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '85%',
    height: '35%',
    borderRadius: 30,
    elevation:20,
  },
  newRecipeView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '85%',
    height: '25%',
    borderRadius: 30,
    elevation:20,
  },
  listsView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '85%',
    height: '25%',
    borderRadius: 30,
    elevation:20,
  },
});

export default HomeScreen;
