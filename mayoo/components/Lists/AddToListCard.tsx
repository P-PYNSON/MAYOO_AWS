import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {importedList} from '../../types/listsTypes';
import {newRecipe} from '../../types/recipeTypes';

interface AddToListCardProps {
  list: importedList;
  recipe: newRecipe;
  addRecipeToList: () => void;
}

const AddToListCard = ({list, recipe, addRecipeToList}: AddToListCardProps) => {
  const [showConfirmAddingTwiceModal, setShowConfirmAddingTwiceModal] =
    useState<boolean>(false);

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.listCard}
        onPress={() => {
          if (list.recipes && list.recipes.includes(recipe.name)) {
            setShowConfirmAddingTwiceModal(true);
          } else {
            addRecipeToList();
          }
        }}>
        <Text style={styles.listCardText}>{list.name}</Text>
        {list.recipes && list.recipes.includes(recipe.name) && (
          <Text>added</Text>
        )}
      </TouchableOpacity>
      {showConfirmAddingTwiceModal && (
        <View style={styles.confirmMainView}>
          <Text style={styles.comfirmText}>Add '{recipe.name}' again?</Text>
          <View style={styles.confirmButtonView}>
            <TouchableOpacity
              onPress={() => {
                addRecipeToList();
                setShowConfirmAddingTwiceModal(false);
              }}
              style={styles.confirmButton}>
              <Text style={styles.confirmButtonsText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowConfirmAddingTwiceModal(false);
              }}
              style={styles.cancelButton}>
              <Text style={styles.confirmButtonsText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  main: {width: '100%', padding: 4},
  listCard: {
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  comfirmText: {fontSize: 18},
  listCardText: {fontSize: 20},
  confirmMainView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  confirmButtonView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    padding: 5,
    borderRadius: 10,
    width: '40%',
    backgroundColor: '#79c2d0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  cancelButton: {
    padding: 5,
    borderRadius: 10,
    width: '40%',
    backgroundColor: '#f95959',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  confirmButtonsText: {
    color: 'white',
  },
});
export default AddToListCard;
