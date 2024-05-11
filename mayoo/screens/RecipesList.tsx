import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {listRecipes, getRecipe} from '../src/graphql/queries';
import {importedRecipe, newRecipe} from '../types/recipeTypes';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RecipesListCard from '../components/recipeList/RecipeListCard';
import RecipeShearchBar from '../components/recipeList/RecipeShearchBar';

const client = generateClient();

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const RecipesList: React.FC<HomeScreenProps> = ({navigation}) => {
  const [recipesList, setRecipesList] = useState<importedRecipe[]>([]);
  const [filteredList, setFilteredList] = useState<importedRecipe[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [pageItems, setPageItems] = useState<number>(0);
  const [listLength, setListLength] = useState<number>(0);
  const itemsPerPage = 5;

  const recipeData = async () => {
    try {
      const recipeList: GraphQLResult<any> = await client.graphql({
        query: listRecipes,
        variables: {},
      });

      setRecipesList(recipeList.data.listRecipes.items);
      setFilteredList(recipeList.data.listRecipes.items);
      setListLength(recipeList.data.listRecipes.items.length);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      recipeData();
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <RecipeShearchBar
        setListLength={setListLength}
        recipesList={recipesList}
        setFilteredList={setFilteredList}
        setDataLoading={setDataLoading}></RecipeShearchBar>
      {dataLoading && <ActivityIndicator size={'large'}></ActivityIndicator>}
      <View style={styles.mainView}>
        {recipesList.length > 0 &&
          filteredList
            .slice(pageItems, pageItems + itemsPerPage)
            .map((recipe: importedRecipe, index: number) => (
              <RecipesListCard
                key={index}
                navigation={navigation}
                recipe={recipe}></RecipesListCard>
            ))}
      </View>
      <View style={styles.pagesButtonsView}>
        {pageItems - itemsPerPage >= 0 && (
          <Button
            onPress={() => {
              if (pageItems - itemsPerPage >= 0) {
                setPageItems(pageItems - itemsPerPage);
              }
            }}
            title="previous"></Button>
        )}
        {pageItems + itemsPerPage < listLength && (
          <Button
            onPress={() => {
              if (pageItems + itemsPerPage <= listLength)
                setPageItems(pageItems + itemsPerPage);
            }}
            title="next"></Button>
        )}
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
    marginTop: 20,
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
  pagesButtonsView: {
    width: '90%',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:15
  },
});

export default RecipesList;
