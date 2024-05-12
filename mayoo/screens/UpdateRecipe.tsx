import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {getRecipe} from '../src/graphql/queries';
import {
  Ingredient,
  graphQlReturnedIngredient,
  importedRecipe,
  updatedRecipe,
} from '../types/recipeTypes';
import RecipeName from '../components/recipe/RecipeName';
import RecipeIngredients from '../components/recipe/RecipeIngredients';
import Instructions from '../components/recipe/Instructions';
import AditionalInfos from '../components/recipe/AditionalInfos';
import ModalTemplate from '../components/recipe/modals/ModalTemplate';
import RecipeSaved from '../components/recipe/modals/RecipeSaved';
import RecipeFailed from '../components/recipe/modals/RecipeFailed';
import {updateRecipe} from '../src/graphql/mutations';
import {remove, uploadData} from 'aws-amplify/storage';

const client = generateClient();

interface UpdateRecipeProps {
  route: RouteProp<RootStackParamList, 'ShowRecipe'>;
}
const UpdateRecipe: React.FC<UpdateRecipeProps> = ({route}) => {
  const {id} = route.params;
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const [previousImage, setPreviousImage] = useState<string | undefined>();
  const [imagePath, setImagePath] = useState<string | undefined>();
  const [servings, setServings] = useState<string | undefined>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [prepTime, setPrepTime] = useState<string | undefined>();
  const [cookTime, setCookTime] = useState<string | undefined>();
  const [instructions, setInstructions] = useState<string[]>(['']);

  const [savingRecipe, setSavingRecipe] = useState<boolean>(false);
  const [showValidationModal, setShowValidationModal] = useState<string>('');
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  useEffect(() => {
    const recipeData = async () => {
      try {
        const newRecipe: GraphQLResult<any> = await client.graphql({
          query: getRecipe,
          variables: {
            id: id,
          },
        });
        const recipeObject = newRecipe.data.getRecipe;
        const filteredIngredients = recipeObject.ingredients.map(
          (ingredient: graphQlReturnedIngredient) => {
            // Create a new object without "__typename" field
            const {__typename, ...rest} = ingredient;
            return rest;
          },
        );

        setName(recipeObject.name ? recipeObject.name : undefined);
        setCategory(recipeObject.category ? recipeObject.category : undefined);
        setImage(recipeObject.image ? recipeObject.image : undefined);
        setPreviousImage(recipeObject.image ? recipeObject.image : undefined);
        setServings(
          recipeObject.servings ? recipeObject.servings.toString() : undefined,
        );
        setIngredients(filteredIngredients);
        setPrepTime(
          recipeObject.prepTime ? recipeObject.prepTime.toString() : undefined,
        );
        setCookTime(
          recipeObject.cookTime ? recipeObject.cookTime.toString() : undefined,
        );
        setInstructions(
          recipeObject.instructions ? recipeObject.instructions : undefined,
        );

        /*  setRecipe(newRecipe.data.getRecipe); */
        setDataLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    recipeData();
  }, [id]);

  async function updateRecipeHandler(recipe: updatedRecipe) {
    try {
      const newRecipe = await client.graphql({
        query: updateRecipe,
        variables: {
          input: recipe,
        },
      });
;
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
          id: id,
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

        if (previousImage && previousImage != '') {
          try {
            await remove({
              key: previousImage,
              options: {
                accessLevel: 'guest',
              },
            });
          } catch (error) {
            console.log('Error ', error);
          }
        }
        updateRecipeHandler(recipe);
      } catch (error) {
        console.log(error);
        setShowValidationModal('error');
      }
    }
  }

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require('../assets/images/background.webp')}
        style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollview}>
          <RecipeName
            recipeId={id}
            setName={setName}
            setCategory={setCategory}
            setImage={setImage}
            setImagePath={setImagePath}
            previousImage={previousImage}
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
                  <Text style={styles.saveRecipeButtonText}>
                    Modify Recipe !
                  </Text>
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
};

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

export default UpdateRecipe;
