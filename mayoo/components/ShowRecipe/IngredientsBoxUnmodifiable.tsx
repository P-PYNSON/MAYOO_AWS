import React, {useEffect, useState} from 'react';
import {Ingredient} from '../../types/recipeTypes';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ingredientsBoxProps = {
  ingredients: Ingredient[];
};

export default function IngredientsBoxUnmodifiable({
  ingredients,
}: ingredientsBoxProps) {
  return (
    <View style={styles.main}>
      <Text style={styles.ingredientsText}> 🍓 Ingredients 🥕</Text>
      <View style={styles.box}>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientView}>
            <View style={styles.ingredient} key={index}>
              <Image
                style={{width: 50, height: 50}}
                source={{
                  uri: `https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`,
                }}
              />
              <Text
                style={styles.ingredientNameText}
                textBreakStrategy="balanced">
                {ingredient.name}
              </Text>
              <View style={styles.textView}>
                <Text>{ingredient.quantity}</Text>
                <Text>{ingredient.unit}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    elevation: 20,
    display: 'flex',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ingredientsText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 20,
  },
  ingredientView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 5,
    minWidth: '25%',
    maxWidth: '40%',
  },
  ingredient: {
    borderRadius: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  ingredientNameText: {textAlign:'center'},
  textView: {display: 'flex', flexDirection: 'row', gap: 5},
});
