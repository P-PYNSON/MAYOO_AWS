import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Ingredient} from '../types/recipeTypes';
import RecipeName from '../components/recipe/RecipeName';
import {fetchAuthSession} from 'aws-amplify/auth';
import RecipeIngredients from '../components/recipe/RecipeIngredients';
import Instructions from '../components/recipe/Instructions';
import AditionalInfos from '../components/recipe/AditionalInfos';

export default function CreateRecipe() {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const [servings, setServings] = useState<string | undefined>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [prepTime, setPrepTime] = useState<string | undefined>();
  const [cookTime, setCookTime] = useState<string | undefined>();
  const [instructions, setInstructions] = useState<string[]>(['']);

  useEffect(() => {}, []);

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollview}>
          <RecipeName
            setName={setName}
            setCategory={setCategory}
            setImage={setImage}
            data={{name, category, image}}></RecipeName>

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
});
