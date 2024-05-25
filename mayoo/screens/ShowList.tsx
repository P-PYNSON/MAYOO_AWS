import {RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {RootStackParamList} from '../App';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ListIngredient, UpdateListResponse} from '../types/listsTypes';
import ListItemCard from '../components/Lists/ListItemCard';
import {updateList} from '../src/graphql/mutations';
import {Observable} from 'rxjs';
import {getList, listFriends} from '../src/graphql/queries';
import ModalTemplate from '../components/recipe/modals/ModalTemplate';
import DeleteRecipe from '../components/recipe/modals/DeleteRecipe';
import DeleteList from '../components/recipe/modals/DeleteList';
import AddIngredientsToList from '../components/Lists/AddIngredientsToList';
import {Ingredient} from '../types/recipeTypes';
import {importedFriends} from '../types/friendsTypes';
import AddFriend from '../components/shared/AddFriend';

const client = generateClient();

interface ShowRecipeProps {
  route: RouteProp<RootStackParamList, 'ShowList'>;
}

const ShowList: React.FC<ShowRecipeProps> = ({route}) => {
  let {routeList} = route.params;

  const [list, setList] = useState(routeList);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [friendList, setFriendList] = useState<importedFriends[]>([]);
  const [addFriendMessage, setAddFriendMessage] = useState<string>();

  const addFriendToList = async (
    newAthorSub: string,
    newAuthorName: string,
  ) => {
    let newAuthorsArray = [...list.authors];

    if (!newAuthorsArray.includes(newAuthorName)) {
      try {
        newAuthorsArray.push(newAthorSub + '::' + newAuthorName);
        const newRecipe = await client.graphql({
          query: updateList,
          variables: {
            input: {id: list.id, authors: newAuthorsArray},
          },
        });

        if (newRecipe instanceof Observable) {
          newRecipe.subscribe({
            next: response => {
              setList(response.data.updateList);
              setAddFriendMessage('friend added!');
            },
            error: error => {
              console.error(error);
              setAddFriendMessage('Request error');
            },
          });
        } else {
          setList(newRecipe.data.updateList);
          setAddFriendMessage('friend added!');
        }
      } catch (error) {
        console.log(error);
        setAddFriendMessage('Request error');
      }
    } else {
      setAddFriendMessage('Friend already added');
    }
  };

  const fetchFriendsList = async () => {
    try {
      const recipeFriends: GraphQLResult<any> = await client.graphql({
        query: listFriends,
        variables: {},
      });
      console.log(recipeFriends.data.listFriends.items);
      setFriendList(recipeFriends.data.listFriends.items);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIngredient = async (index: number) => {
    let ingredientArray = [...list.ingredients].map((ingredient: any) => {
      // Create a new object without "__typename" field
      const {__typename, ...rest} = ingredient;
      return rest;
    });

    if (ingredientArray[index].checked == 'true') {
      ingredientArray[index].checked = 'false';
    } else if (ingredientArray[index].checked == 'false') {
      ingredientArray[index].checked = 'true';
    }

    try {
      const newRecipe = await client.graphql<UpdateListResponse>({
        query: updateList,
        variables: {
          input: {
            id: list.id,
            ingredients: ingredientArray,
          },
        },
      });

      /*  Check if newRecipe is an Observable, APIs typing is fun !!*/

      if (newRecipe instanceof Observable) {
        newRecipe.subscribe({
          next: response => {
            setList(response.data.updateList);
          },
          error: error => {
            console.error(error);
          },
        });
      } else {
        setList(newRecipe.data.updateList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateListHandler = async () => {
    try {
      const updatedList: GraphQLResult<any> = await client.graphql({
        query: getList,
        variables: {
          id: list.id,
        },
      });

      setList(updatedList.data.getList);
    } catch (error) {
      console.log(error);
    }
  };

  const addIngredient = async (ingredient: Ingredient) => {
    let ingredientArray: ListIngredient[] = [];

    if (list.ingredients && list.ingredients.length > 0) {
      ingredientArray = [...list.ingredients].map((ingredient: any) => {
        // Create a new object without "__typename" field
        const {__typename, ...rest} = ingredient;
        return rest;
      });
    }

    const ingredientToAdd: ListIngredient = {
      checked: 'false',
      number: 1,
      image: ingredient.image,
      name: ingredient.name,
      quantities: [ingredient.quantity + ' ' + ingredient.unit],
    };

    /* Check if ingredient already exist to raise quantities instead of adding it */
    let objToUpdate: ListIngredient | undefined = ingredientArray.find(
      item => item.name === ingredient.name,
    );
    if (objToUpdate) {
      objToUpdate.checked = 'false';
      objToUpdate.number = objToUpdate.number + 1;
      objToUpdate.quantities.push(ingredient.quantity + ' ' + ingredient.unit);
    } else {
      ingredientArray.push(ingredientToAdd);
    }
    try {
      const updatedList = await client.graphql({
        query: updateList,
        variables: {
          input: {
            id: list.id,
            ingredients: ingredientArray,
          },
        },
      });
      if (updatedList instanceof Observable) {
        updatedList.subscribe({
          next: response => {
            setList(response.data.updateList);
          },
          error: error => {
            console.error(error);
          },
        });
      } else {
        setList(updatedList.data.updateList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.mainContentContainer}
      style={styles.main}>
      <Text style={styles.listName} numberOfLines={1} ellipsizeMode="tail">
        {list.name}
      </Text>
      <AddFriend data={list} setList={setList}></AddFriend>

      {/* Ingredient cards */}
      <View style={styles.recipesView}>
        {list.ingredients &&
          list.ingredients.map((ingredient: ListIngredient, index: number) => (
            <View
              key={index}
              style={
                ingredient.checked == 'true'
                  ? styles.ingredientsViewChecked
                  : styles.ingredientsViewUnchecked
              }>
              {ingredient.checked == 'true' && (
                <View style={styles.horizontalLine} />
              )}
              {/* Check Button */}
              <TouchableOpacity
                style={styles.checkButton}
                onPress={() => {
                  checkIngredient(index);
                }}>
                <View
                  style={
                    ingredient.checked == 'true'
                      ? styles.circleFull
                      : styles.circleEmpty
                  }></View>
              </TouchableOpacity>
              <ListItemCard ingredient={ingredient}></ListItemCard>
            </View>
          ))}
      </View>

      {/* Add ingredients */}
      <View style={styles.addIngredientView}>
        <AddIngredientsToList
          addIngredientToList={addIngredient}></AddIngredientsToList>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={() => setShowDeleteModal(true)}
        style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>DELETE LIST</Text>
      </TouchableOpacity>

      {/* Modals*/}
      <ModalTemplate visible={showDeleteModal} onClose={() => {}}>
        <DeleteList
          listName={list.name}
          ListId={list.id}
          closeModal={() => {
            setShowDeleteModal(!showDeleteModal);
          }}></DeleteList>
      </ModalTemplate>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {display: 'flex'},
  mainContentContainer: {
    alignItems: 'center',
    minHeight: '100%',
  },
  listName: {
    fontSize: 24,
    backgroundColor: 'white',
    padding: 10,
    width: '60%',
    textAlign: 'center',
    borderRadius: 10,
    marginTop: 5,
    elevation: 10,
  },
  recipesView: {width: '90%', display: 'flex', gap: 10, marginTop: 20},
  ingredientsViewUnchecked: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  ingredientsViewChecked: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    opacity: 0.5,
    position: 'relative',
  },
  horizontalLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: 'grey',
    width: '100%',
  },
  ingredientMain: {},
  checkButton: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderRightWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleEmpty: {
    width: 30,
    height: 30,
    borderRadius: 500,
    borderColor: 'gray',
    borderWidth: 1,
  },
  circleFull: {
    width: 30,
    height: 30,
    borderRadius: 500,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#cbf078',
  },
  addIngredientView: {width: '100%', marginTop: 30},
  deleteButton: {},
  deleteButtonText: {
    marginTop: 30,
    backgroundColor: '#f95959',
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
});

export default ShowList;
