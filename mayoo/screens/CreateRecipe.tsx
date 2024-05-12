import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {generateClient} from 'aws-amplify/api';
import {createRecipe} from '../src/graphql/mutations';
import {Ingredient, newRecipe} from '../types/recipeTypes';
import RecipeName from '../components/recipe/RecipeName';
import RecipeIngredients from '../components/recipe/RecipeIngredients';
import Instructions from '../components/recipe/Instructions';
import AditionalInfos from '../components/recipe/AditionalInfos';
import ModalTemplate from '../components/recipe/modals/ModalTemplate';
import RecipeSaved from '../components/recipe/modals/RecipeSaved';
import RecipeFailed from '../components/recipe/modals/RecipeFailed';
import {remove, uploadData} from 'aws-amplify/storage';

const client = generateClient();

export default function CreateRecipe() {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const [imagePath, setImagePath] = useState<string | undefined>();
  const [servings, setServings] = useState<string | undefined>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [prepTime, setPrepTime] = useState<string | undefined>();
  const [cookTime, setCookTime] = useState<string | undefined>();
  const [instructions, setInstructions] = useState<string[]>(['']);

  const [savingRecipe, setSavingRecipe] = useState<boolean>(false);
  const [showValidationModal, setShowValidationModal] = useState<string>('');

  async function saveRecipe(recipe: newRecipe) {
    try {
      const newRecipe = await client.graphql({
        query: createRecipe,
        variables: {
          input: recipe,
        },
      });
      setSavingRecipe(false);
      setShowValidationModal('saved');
    } catch (error) {
      console.log(error);
      setSavingRecipe(false);
      setShowValidationModal('error');
    }
  }

  async function validateRecipe() {
    setSavingRecipe(true);
    if (name.length > 2 && ingredients.length > 0) {
      try {
        const recipe = {
          name: name,
          category: category,
          image: image,
          servings: servings ? parseInt(servings) : undefined,
          ingredients: ingredients,
          prepTime: prepTime ? parseInt(prepTime) : undefined,
          cookTime: cookTime ? parseInt(cookTime) : undefined,
          instructions: instructions,
        };

        if (imagePath && imagePath != '' && image && image != '') {
          const imageBlob = await fetch(imagePath);
          const blob = await imageBlob.blob();
          try {
            const result = await uploadData({
              key: image,
              data: blob,
              options: {
                accessLevel: 'guest',
                contentType: 'image',
              },
            });
          } catch (error) {
            console.log('upload error', error);
          }
        }
        saveRecipe(recipe);
      } catch (error) {
        console.log(error);
        setShowValidationModal('error');
      }
    }
  }

  useEffect(() => {}, []);

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require('../assets/images/background.webp')}
        style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollview}>
          <RecipeName
            setName={setName}
            setCategory={setCategory}
            setImage={setImage}
            setImagePath={setImagePath}
            data={{name, image}}></RecipeName>

          <RecipeIngredients
            setServings={setServings}
            ingredients={ingredients}
            setIngredients={setIngredients}
            data={{
              servings: servings,
              ingredients: ingredients,
            }}></RecipeIngredients>

          <Instructions
            setInstructions={setInstructions}
            instructions={instructions}></Instructions>

          <AditionalInfos
            data={{category, servings, prepTime, cookTime}}
            setCategory={setCategory}
            setServings={setServings}
            setCookTime={setCookTime}
            setPrepTime={setPrepTime}></AditionalInfos>

          {name.length < 3 && (
            <View style={styles.validationTextView}>
              <Text style={styles.validationText}>
                Recipe name must be at least 3 letters long
              </Text>
            </View>
          )}
          {ingredients.length < 1 && (
            <View style={styles.validationTextView}>
              <Text style={styles.validationText}>
                Recipe needs at least one ingredient
              </Text>
            </View>
          )}
          {name.length > 2 && ingredients.length > 0 && (
            <>
              {!savingRecipe && (
                <TouchableOpacity
                  style={styles.saveRecipeButton}
                  onPress={() => {
                    validateRecipe();
                  }}>
                  <Text style={styles.saveRecipeButtonText}>Save Recipe !</Text>
                </TouchableOpacity>
              )}
              {savingRecipe && (
                <ActivityIndicator size={'large'}></ActivityIndicator>
              )}
            </>
          )}

          <ModalTemplate
            visible={showValidationModal != ''}
            onClose={() => {
              setShowValidationModal('');
            }}>
            {showValidationModal == 'saved' && <RecipeSaved></RecipeSaved>}
            {showValidationModal == 'error' && (
              <RecipeFailed
                closeModal={() => {
                  setShowValidationModal('');
                }}></RecipeFailed>
            )}
          </ModalTemplate>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {},
  backgroundImage: {},
  scrollview: {
    paddingVertical: 40,
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  saveRecipeButton: {
    width: '70%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
  saveRecipeButtonText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  validationTextView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  validationText: {fontSize: 20},
});
