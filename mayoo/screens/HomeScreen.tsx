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
import {BlurView} from '@react-native-community/blur';
import ContouredText from '../components/shared/ContouredText';

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
          <BlurView style={styles.absolute} blurType="light" blurAmount={6} />
          <ContouredText fontSize={30}>My recipes</ContouredText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newRecipeView}
          onPress={() => navigation.navigate('CreateRecipe')}>
          <BlurView style={styles.absolute} blurType="light" blurAmount={6} />
          <ContouredText fontSize={30}>Create new recipe</ContouredText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listsView}
          onPress={() => navigation.navigate('MyLists')}>
          <BlurView style={styles.absolute} blurType="light" blurAmount={6} />
          <ContouredText fontSize={30}>My lists</ContouredText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.friendsView}
          onPress={() => navigation.navigate('FriendsList')}>
          <BlurView style={styles.absolute} blurType="light" blurAmount={6} />
          <ContouredText fontSize={30}>My friends</ContouredText>
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
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: '85%',
    height: '25%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 30,
    overflow: 'hidden',
  },
  newRecipeView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: '85%',
    height: '20%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 30,
    overflow: 'hidden',
  },
  listsView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: '85%',
    height: '20%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 30,
    overflow: 'hidden',
  },
  friendsView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: '85%',
    height: '20%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 30,
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  text: {
    fontSize: 20,
    fontFamily: 'casual',
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: '#000', // Contour color
    textShadowOffset: {width: -1, height: 1}, // Adjust offsets for contour thickness
    textShadowRadius: 2,
  },
});

export default HomeScreen;
