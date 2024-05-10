import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import IngredientsBoxUnmodifiable from '../components/ShowRecipe/IngredientsBoxUnmodifiable';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {getRecipe} from '../src/graphql/queries';
import {importedRecipe} from '../types/recipeTypes';
import InstructionsUnmodifiable from '../components/ShowRecipe/InstructionsUnmodifiable';
import {getUrl} from 'aws-amplify/storage';

const client = generateClient();

interface ShowRecipeProps {
  route: RouteProp<RootStackParamList, 'ShowRecipe'>;
}

const ShowRecipe: React.FC<ShowRecipeProps> = ({route}) => {
  const {id} = route.params;

  const [recipe, setRecipe] = useState<importedRecipe>();
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [recipeImageUrl, setRecipeImageUrl] = useState<string>();

  const createImageUrl = async () => {
    if (recipe && recipe.image) {
      const getUrlResult = await getUrl({
        key: recipe.image,
        options: {accessLevel: 'private'},
      });
      setRecipeImageUrl(String(getUrlResult.url));
    }
  };
  useEffect(() => {
    createImageUrl();
  }, [recipe]);

  useEffect(() => {
    const recipeData = async () => {
      try {
        const newRecipe: GraphQLResult<any> = await client.graphql({
          query: getRecipe,
          variables: {
            id: id,
          },
        });

        setRecipe(newRecipe.data.getRecipe);
        setDataLoading(false);
        fetch(newRecipe.data.getRecipe.image)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    recipeData();
  }, [id]);

  return (
    <ScrollView contentContainerStyle={styles.main}>
      {dataLoading && <ActivityIndicator size={'large'}></ActivityIndicator>}
      {recipe && (
        <View style={styles.mainView}>
          {!recipe.image && (
            <Image
              source={require('../assets/images/background.webp')}
              style={styles.recipeImage}></Image>
          )}
          {recipeImageUrl != undefined && (
            <Image
              source={{uri: recipeImageUrl}}
              style={styles.recipeImage}></Image>
          )}
          {recipe.image && recipeImageUrl == undefined && (
            <ActivityIndicator></ActivityIndicator>
          )}
          <View style={styles.textView}>
            <Text style={styles.textViewText}>{recipe.name}</Text>
          </View>

          <IngredientsBoxUnmodifiable
            ingredients={recipe.ingredients}></IngredientsBoxUnmodifiable>
          {recipe.instructions && recipe.instructions[0] != '' && (
            <InstructionsUnmodifiable
              instructions={recipe.instructions}></InstructionsUnmodifiable>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  mainView: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  recipeImage: {width: '100%', height: 150},
  textView: {
    width: '100%',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    elevation: 10,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  textViewText: {fontSize: 20, color: 'black'},
  ingredientView: {},
  ingredientsText: {},
});

export default ShowRecipe;
