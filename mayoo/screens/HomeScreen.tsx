import React, {useEffect} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import OptionsScreen from './OptionsScreen';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/images/background.webp')}
      style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <OptionsScreen></OptionsScreen>
        <TouchableOpacity
          style={styles.allRecipesView}
          onPress={() => navigation.navigate('RecipesList')}>
          <Text>My recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newRecipeView}
          onPress={() => navigation.navigate('CreateRecipe')}>
          <Text>Create new recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listsView}
          onPress={() => navigation.navigate('MyLists')}>
          <Text>My list</Text>
        </TouchableOpacity>
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
    gap: 20,
  },
  allRecipesView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '85%',
    height: '35%',
    borderRadius: 30,
    elevation: 20,
  },
  newRecipeView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '85%',
    height: '25%',
    borderRadius: 30,
    elevation: 20,
  },
  listsView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '85%',
    height: '25%',
    borderRadius: 30,
    elevation: 20,
  },
});

export default HomeScreen;
