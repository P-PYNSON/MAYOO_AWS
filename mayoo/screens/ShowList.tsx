import {RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {RootStackParamList} from '../App';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ListIngredient, UpdateListResponse} from '../types/listsTypes';
import ListItemCard from '../components/Lists/ListItemCard';
import {updateList} from '../src/graphql/mutations';
import {Observable} from 'rxjs';
import {getList} from '../src/graphql/queries';
import ModalTemplate from '../components/recipe/modals/ModalTemplate';
import DeleteRecipe from '../components/recipe/modals/DeleteRecipe';
import DeleteList from '../components/recipe/modals/DeleteList';

const client = generateClient();

interface ShowRecipeProps {
  route: RouteProp<RootStackParamList, 'ShowList'>;
}

const ShowList: React.FC<ShowRecipeProps> = ({route}) => {
  let {routeList} = route.params;
  const [list, setList] = useState(routeList);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
            console.log(response.data.updateList.ingredients);
            setList(response.data.updateList);
          },
          error: error => {
            console.error(error);
          },
        });
      } else {
        console.log(newRecipe.data.updateList.ingredients);
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
      console.log('recipe loaded');
      setList(updatedList.data.getList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.mainContentContainer}
      style={styles.main}>
      <Text style={styles.listName} numberOfLines={1} ellipsizeMode="tail">
        {list.name}
      </Text>
      <View style={styles.recipesView}>
        {list.ingredients.map((ingredient: ListIngredient, index: number) => (
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
      <TouchableOpacity
        onPress={() => setShowDeleteModal(true)}
        style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>DELETE LIST</Text>
      </TouchableOpacity>

      <ModalTemplate
        visible={showDeleteModal}
        onClose={() => {
          /* recipeData(); */
        }}>
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
