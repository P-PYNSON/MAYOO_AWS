import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {listRecipes, getRecipe} from '../src/graphql/queries';
import {importedRecipe, newRecipe} from '../types/recipeTypes';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RecipesListCard from '../components/recipeList/RecipeListCard';
import RecipeShearchBar from '../components/recipeList/RecipeShearchBar';
import {fetchRecipes} from '../amplify/backend/api/fetchAndFilter/functions';

const client = generateClient();

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const RecipesList: React.FC<HomeScreenProps> = ({navigation}) => {
  const [recipesList, setRecipesList] = useState<importedRecipe[]>([]);
  const [inputText, setInputText] = useState('');
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('default');
  const [page, setPage] = useState<number>(0);
  const [listLength, setListLength] = useState<number>(0);
  const itemsPerPage = 5;
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string | undefined>(
    'first',
  );

  const shouldShowNextButton =
    page * itemsPerPage + itemsPerPage < listLength ||
    lastEvaluatedKey !== undefined;

  const sendQuery = async (key: string, reset: boolean) => {
    setDataLoading(true);
    const previousListArray = [...recipesList];
    const response = await fetchRecipes(filter, key);

    if (reset == true) {
      setPage(0);
      setListLength(response.Count);
      setRecipesList(response.Items);
    } else {
      response.Items.forEach((item: importedRecipe) => {
        previousListArray.push(item);
      });
      setRecipesList(previousListArray);
      setListLength(listLength + response.Count);
    }

    //somehow the query will return previous LastEvaluatedKey, even if new query count is less than set limit so :
    if (
      response.Count < itemsPerPage ||
      response.LastEvaluatedKey == undefined ||
      encodeURIComponent(JSON.stringify(response.LastEvaluatedKey)) ==
        lastEvaluatedKey
    ) {
      setLastEvaluatedKey(undefined);
    } else {
      setLastEvaluatedKey(
        encodeURIComponent(JSON.stringify(response.LastEvaluatedKey)),
      );
    }

    setDataLoading(false);
  };

  useEffect(() => {
    sendQuery('first', false);
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.inputMain}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={text => {
            setInputText(text);
            setFilter(text);
          }}></TextInput>
        <Button
          onPress={() => {
            sendQuery('first', true);
          }}
          title="search"></Button>
      </View>
      {dataLoading && <ActivityIndicator size={'large'}></ActivityIndicator>}
      <View style={styles.mainView}>
        {recipesList.length > 0 &&
          recipesList
            .slice(itemsPerPage * page, itemsPerPage * page + itemsPerPage)
            .map((recipe: importedRecipe, index: number) => (
              <RecipesListCard
                key={index}
                navigation={navigation}
                recipe={recipe}></RecipesListCard>
            ))}
      </View>
      <View style={styles.pagesButtonsView}>
        {page > 0 && (
          <TouchableOpacity
            style={styles.previousButton}
            onPress={() => {
              if (page > 0) {
                setPage(page - 1);
              }
            }}>
            <Text style={styles.pageButtonsText}>Previous</Text>
          </TouchableOpacity>
        )}
        {shouldShowNextButton && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              if (page * itemsPerPage < listLength) {
                setPage(page + 1);
              }
              if (lastEvaluatedKey !== undefined) {
                sendQuery(lastEvaluatedKey, false);
              }
            }}>
            <Text style={styles.pageButtonsText}>Next</Text>
          </TouchableOpacity>
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
  inputMain: {
    marginTop: 10,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  textInput: {
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  button: {width: '20%'},
  buttonText: {},
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
    height: 50,
    width: '90%',
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    position: 'relative',
  },
  previousButton: {
    backgroundColor: '#79c2d0',
    height: '100%',
    width: '40%',
    position: 'absolute',
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#79c2d0',
    height: '100%',
    width: '40%',
    position: 'absolute',
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageButtonsText: {color:'white', fontWeight:'bold', fontSize:20},
});

export default RecipesList;
