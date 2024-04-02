import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Ingredient} from '../types/recipeTypes';
import RecipeName from '../components/recipe/RecipeName';
import {fetchAuthSession} from 'aws-amplify/auth';
import RecipeIngredients from '../components/recipe/RecipeIngredients';

export default function CreateRecipe() {
  const [name, setName] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const [servings, setServings] = useState<string | undefined>();
  const [ingredients, setIngredients] = useState<Ingredient[] | undefined>();
  const [prepTime, setPrepTime] = useState<string | undefined>();
  const [cookTime, setCookTime] = useState<string | undefined>();
  const [instruction, setInstructions] = useState<string[] | undefined>();

  useEffect(() => {}, []);

  return (
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
          setIngredients={setIngredients}
          data={{
            servings: servings,
            ingredients: ingredients,
          }}></RecipeIngredients>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {width: '100%', height: '100%'},
  scrollview: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
