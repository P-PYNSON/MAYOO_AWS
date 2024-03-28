import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Ingredient} from '../types/recipeTypes';
import RecipeName from '../components/recipe/RecipeName';
import {fetchAuthSession} from 'aws-amplify/auth';

export default function CreateRecipe() {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [servings, setServings] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>();
  const [prepTime, setPrepTime] = useState<number | null>(null);
  const [cookTime, setCookTime] = useState<number | null>(null);
  const [instruction, setInstructions] = useState<string[] | null>(null);

  useEffect(() => {
    async function fetchSpoon() {
      try {
        const {accessToken, idToken} = (await fetchAuthSession()).tokens ?? {};
        
        if (idToken != undefined) {
          console.log(idToken.toString());
          const response = await fetch(
            'https://fd3gcmobm4.execute-api.eu-north-1.amazonaws.com/dev/spoonacular/qsdqd',
            {
              method: 'GET',
              headers: {AuthorizationPool: idToken.toString()},
            },
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchSpoon();
  }, []);

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
