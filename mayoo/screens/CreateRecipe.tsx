import React, {useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Ingredient} from '../types/recipeTypes';
import RecipeName from '../components/recipe/RecipeName';

export default function CreateRecipe() {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [servings, setServings] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>();
  const [prepTime, setPrepTime] = useState<number | null>(null);
  const [cookTime, setCookTime] = useState<number | null>(null);
  const [instruction, setInstructions] = useState<string[] | null>(null);

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
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {width: '100%', height: '100%'},
  scrollview: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
