import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {importedRecipe} from '../../types/recipeTypes';
import ModalTemplate from '../recipe/modals/ModalTemplate';
import DeleteRecipe from '../recipe/modals/DeleteRecipe';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  recipe: importedRecipe;
}

const RecipesListCard: React.FC<HomeScreenProps> = ({navigation, recipe}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.recipeView}
        onPress={() => {
          if (!showOptions) {
            navigation.navigate('ShowRecipe', {id: recipe.id});
          } else {
            setShowOptions(false);
          }
        }}
        onLongPress={() => {
          setShowOptions(true);
        }}>
        <Image
          source={
            recipe.image == null
              ? require('../../assets/images/background.webp')
              : {uri: recipe.image}
          }
          style={styles.recipeImage}></Image>
        <View style={styles.textView}>
          <Text style={styles.textViewText}>{recipe.name}</Text>
        </View>

        {/* VIEW SHOWING DELETE MODIFY OPTIONS */}
        {showOptions && (
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => {
                setShowOptions(false);
                setShowDeleteModal(true);
              }}
              style={styles.deleteView}>
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowOptions(false);
                navigation.navigate('UpdateRecipe', {id: recipe.id});
              }}
              style={styles.modifyView}>
              <Text>Modify</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* MODALS*/}
        <ModalTemplate
          visible={showDeleteModal}
          onClose={() => {
            /* recipeData(); */
          }}>
          <DeleteRecipe
            recipeName={recipe.name}
            recipeID={recipe.id}
            closeModal={() => {
              setShowDeleteModal(!showDeleteModal);
            }}></DeleteRecipe>
        </ModalTemplate>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    display: 'flex',
  },
  recipeView: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    elevation: 20,
  },
  recipeImage: {width: '100%', height: 100},
  textView: {
    position: 'absolute',
    width: '70%',
    top: 10,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  textViewText: {fontSize: 20, color: 'black'},
  buttonView: {
    marginTop: 5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteView: {
    padding: 10,
    borderRadius: 10,
    width: '40%',
    backgroundColor: '#f95959',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modifyView: {
    padding: 10,
    borderRadius: 10,
    width: '40%',
    backgroundColor: '#79c2d0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecipesListCard;
