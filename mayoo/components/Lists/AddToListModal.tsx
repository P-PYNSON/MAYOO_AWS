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
import {listLists} from '../../src/graphql/queries';
import CreateListInput from '../shared/CreateListInput';
import {
  ListIngredient,
  graphQLReturnedListIngredient,
  importedList,
} from '../../types/listsTypes';
import {newRecipe} from '../../types/recipeTypes';
import {updateList} from '../../src/graphql/mutations';
import ModalTemplate from '../recipe/modals/ModalTemplate';
import ListSavingSuccess from '../recipe/modals/ListSavingSuccess';
import ListSavingFailed from '../recipe/modals/ListSavingFailed';
import AddToListCard from './AddToListCard';
const client = generateClient();

interface AddToListModalProps {
  closeModal: () => void;
  recipe: newRecipe;
}

const AddToListModal = ({closeModal, recipe}: AddToListModalProps) => {
  const [recipesList, setRecipesList] = useState<importedList[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [savingList, setSavingList] = useState<boolean>(false);
  const [savingListResult, setSavingListResult] = useState<string>('');
  const [showCreateListInput, setShowCreateListInput] =
    useState<boolean>(false);
 
  const getListOfLists = async () => {
    setDataLoading(true);
    try {
      const listOfLists: GraphQLResult<any> = await client.graphql({
        query: listLists,
      });
      setRecipesList(listOfLists.data.listLists.items);
      setDataLoading(false);
      console.log(listOfLists.data.listLists.items[0].ingredients);
    } catch (error) {
      console.log(error);
    }
  };

  const addRecipeToList = async (list: importedList, recipe: newRecipe) => {
    setSavingList(true);

    const recipeIngredients = [...recipe.ingredients];
    const listIngredients = list.ingredients ? [...list.ingredients] : [];
    const recipesInTheList = list.recipes ? [...list.recipes] : [];

    /*  {add recipe name to the list only if not there already} */
    if (!recipesInTheList.includes(recipe.name)) {
      recipesInTheList.push(recipe.name);
    }

    recipeIngredients.forEach((ingredient, index) => {
      let objToUpdate: ListIngredient | undefined = listIngredients.find(
        item => item.name === ingredient.name,
      );
      if (objToUpdate) {
        objToUpdate.checked = 'false';
        objToUpdate.number = objToUpdate.number + 1;
        objToUpdate.quantities.push(
          ingredient.quantity + ' ' + ingredient.unit,
        );
      } else {
        const formatedIngredient = {
          checked: 'false',
          number: 1,
          image: ingredient.image,
          name: ingredient.name,
          quantities: [ingredient.quantity + ' ' + ingredient.unit],
        };
        listIngredients.push(formatedIngredient);
      }
    });
    try {
      const filteredListIngredients = listIngredients.map((ingredient: any) => {
        // Create a new object without "__typename" field
        const {__typename, ...rest} = ingredient;
        return rest;
      });

      const newRecipe = await client.graphql({
        query: updateList,
        variables: {
          input: {
            id: list.id,
            recipes: recipesInTheList,
            ingredients: filteredListIngredients,
          },
        },
      });
      console.log(newRecipe);
      setSavingList(false);
      setSavingListResult('success');
    } catch (error) {
      console.log(error);
      setSavingList(false);
      setSavingListResult('error');
    }
    console.log(listIngredients);
  };

  useEffect(() => {
    /*  console.log(recipe.ingredients); */
    getListOfLists();
  }, [showCreateListInput, savingListResult]);

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={closeModal} style={styles.closeCross}>
        <Image
          style={styles.closeCrossImage}
          source={require('../../assets/icons/cross.png')}></Image>
      </TouchableOpacity>

      {/* The list of recipes */}
      {!showCreateListInput && (
        <View style={styles.mainbix}>
          <Text style={styles.title}>Add recipe to a list</Text>
          {!savingList && (
            <ScrollView style={styles.listsScrollView} contentContainerStyle={styles.listsScrollViewContainer}>
              {recipesList.map((list: importedList, index) => (
               <AddToListCard key={index} list={list} recipe={recipe} addRecipeToList={()=> addRecipeToList(list, recipe)}></AddToListCard>
              ))}
            </ScrollView>
          )}
          {savingList && <ActivityIndicator></ActivityIndicator>}
          <TouchableOpacity
            onPress={() => {
              setShowCreateListInput(true);
            }}
            style={styles.createListButton}>
            <Text style={styles.createListButtonText}>Create new List</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Show an input to create a new list */}
      {showCreateListInput && (
        <View style={styles.main}>
          <CreateListInput></CreateListInput>
          <TouchableOpacity
            onPress={() => {
              setShowCreateListInput(false);
            }}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Success or error modals */}
      {
        <ModalTemplate
          visible={savingListResult != ''}
          onClose={() => {
            setSavingListResult('');
          }}>
          {savingListResult == 'success' && (
            <ListSavingSuccess
              closeModal={() => {
                setSavingListResult('');
              }}></ListSavingSuccess>
          )}
          {savingListResult == 'error' && (
            <ListSavingFailed
              closeModal={() => {
                setSavingListResult('');
              }}></ListSavingFailed>
          )}
        </ModalTemplate>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  closeCross: {position: 'absolute', top: -5, right: 20},
  closeCrossImage: {width: 40, height: 40},
  mainbix: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {fontSize: 22},
  listsScrollView: {
    marginVertical: 10,
    width: 300,
    height: '70%',
  },
  listsScrollViewContainer: {
    padding: 10,
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  createListButton: {
    padding: 10,
    borderRadius: 10,
    width: '40%',
    backgroundColor: '#79c2d0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  createListButtonText: {color: 'white'},
  backButton: {
    padding: 10,
    borderRadius: 10,
    width: '40%',
    backgroundColor: '#f95959',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  backButtonText: {color: 'white'},
});

export default AddToListModal;
