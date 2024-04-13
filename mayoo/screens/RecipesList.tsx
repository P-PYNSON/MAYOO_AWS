import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {listRecipes, getRecipe} from '../src/graphql/queries';
import {importedRecipe, newRecipe} from '../types/recipeTypes';

import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const client = generateClient();

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const RecipesList: React.FC<HomeScreenProps> = ({navigation}) => {
  const [recipesList, setRecipesList] = useState([]);

  useEffect(() => {
    const recipeData = async () => {
      try {
        const newRecipe: GraphQLResult<any> = await client.graphql({
          query: listRecipes,
        });
        setRecipesList(newRecipe.data.listRecipes.items);
        console.log(newRecipe.data.listRecipes.items);
        
      } catch (error) {
        console.log(error);
      }
    };
    recipeData();
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.mainView}>
        {recipesList.length > 0 && recipesList.map((recipe: importedRecipe, index: number) => (
          <TouchableOpacity
            style={styles.recipeView}
            key={index}
            onPress={() => {
              navigation.navigate('ShowRecipe', {id:recipe.id});
            }}>
            <Image
              source={
                recipe.image == null
                  ? require('../assets/images/background.png')
                  : {uri: recipe.image}
              }
              style={styles.recipeImage}></Image>
            <View style={styles.textView}>
              <Text style={styles.textViewText}>{recipe.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 30,
  },
  recipeView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    elevation: 20,
  },
  recipeImage: {width: '100%', height: 100},
  textView: {
    position: 'absolute',
    width: '70%',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  textViewText: {fontSize: 20, color: 'black'},
});

export default RecipesList;
