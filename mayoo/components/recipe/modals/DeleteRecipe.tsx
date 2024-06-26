import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {generateClient} from 'aws-amplify/api';
import {deleteRecipe} from '../../../amplify/backend/api/mayooRecipes/functions';

const client = generateClient();

interface RecipeFailedProps {
  closeModal: () => void;
  recipeName: string;
  recipeID: string;
  originalRecipeId: string;
}

const DeleteRecipe = ({
  closeModal,
  recipeName,
  recipeID,
  originalRecipeId,
}: RecipeFailedProps) => {
  const DeleteRecipe = async () => {
    try {
      await deleteRecipe(originalRecipeId, recipeID);
      closeModal();
    } catch (error) {
      console.log('error deleting (front)', error);
    }
  };

  return (
    <View style={styles.main}>
      <Text style={{fontSize: 28, color: 'black'}}>(°□°) 🔥</Text>
      <Text style={styles.text}>
        Are you sure you want to delete '{recipeName}' ?
      </Text>
      <TouchableOpacity
        style={styles.navigationButtonsDelete}
        onPress={() => {
          DeleteRecipe();
        }}>
        <Text style={styles.navigationButtonsText}>DELETE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navigationButtons}
        onPress={() => {
          closeModal();
        }}>
        <Text style={styles.navigationButtonsText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {fontSize: 28},
  navigationButtons: {
    width: '80%',
    backgroundColor: '#e3e3e3',
    elevation: 10,
    padding: 10,
    borderRadius: 10,
    marginTop: 40,
  },
  navigationButtonsDelete: {
    width: '80%',
    backgroundColor: '#f95959',
    elevation: 10,
    padding: 10,
    borderRadius: 10,
    marginTop: 40,
  },
  navigationButtonsText: {fontSize: 22, width: '100%', textAlign: 'center'},
});

export default DeleteRecipe;
