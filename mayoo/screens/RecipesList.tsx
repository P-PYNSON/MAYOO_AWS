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
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {listRecipes, getRecipe} from '../src/graphql/queries';
import {importedRecipe, newRecipe} from '../types/recipeTypes';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RecipesListCard from '../components/recipeList/RecipeListCard';

const client = generateClient();

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const RecipesList: React.FC<HomeScreenProps> = ({navigation}) => {
  const [recipesList, setRecipesList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const closeDeleteModal = (wasDeleted: boolean) => {
    setShowDeleteModal(false);
    if (wasDeleted) {
      recipeData();
    }
  };

  const recipeData = async () => {
    try {
      const recipeList: GraphQLResult<any> = await client.graphql({
        query: listRecipes,
      });
      setRecipesList(recipeList.data.listRecipes.items);
      setDataLoading(false);
      console.log(recipeList.data.listRecipes.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
        recipeData();
      console.log('reloaded');
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.main}>
      {dataLoading && <ActivityIndicator size={'large'}></ActivityIndicator>}
      <View style={styles.mainView}>
        {recipesList.length > 0 &&
          recipesList.map((recipe: importedRecipe, index: number) => (
            <RecipesListCard
              key={index}
              navigation={navigation}
              recipe={recipe}></RecipesListCard>
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
    position: 'relative',
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
  buttonView: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteView: {
    padding: 10,
    borderRadius: 10,
    width: '70%',
    backgroundColor: '#f95959',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecipesList;
