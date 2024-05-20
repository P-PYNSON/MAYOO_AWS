import React, {useEffect} from 'react';
import {
  Button,
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
        {/*   <OptionsScreen></OptionsScreen>
         */}
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
        <TouchableOpacity
          style={styles.friendsView}
          onPress={() => navigation.navigate('FriendsList')}>
          <Text>My friends</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.41)',
    width: '85%',
    height: '25%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  newRecipeView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.41)',
    width: '85%',
    height: '20%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  listsView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.41)',
    width: '85%',
    height: '20%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  friendsView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.41)',
    width: '85%',
    height: '20%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
});

export default HomeScreen;
