import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Ingredient} from '../../types/recipeTypes';

type ingredientsBoxProps = {
  ingredients: Ingredient[];
  setSelectedIngredient: (ingredient: Ingredient) => void;
  setShowModal: (bool: boolean) => void;
  setIngredientIndex: (index: number) => void;
};

export default function IngredientsBox({
  ingredients,
  setSelectedIngredient,
  setShowModal,
  setIngredientIndex,
}: ingredientsBoxProps) {
    
  function modifyIngredientOnPressingIt(ingredient: Ingredient, index:number) {
    setIngredientIndex(index);
    setSelectedIngredient(ingredient);
    setShowModal(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.box}>
        {ingredients.map((ingredient, index) => (
          <View  key={index} style={styles.ingredientView}>
            <Pressable
              style={styles.ingredient}
              key={index}
              onPress={() => {
                modifyIngredientOnPressingIt(ingredient, index);
              }}>
              <Image
                style={{width: 50, height: 50, borderRadius: 200}}
                source={{
                  uri: `https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`,
                }}
              />
              <Text textBreakStrategy="balanced">{ingredient.name}</Text>
              <View style={styles.textView}>
                <Text>{ingredient.quantity}</Text>
                <Text>{ingredient.unit}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    elevation: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ingredientView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    elevation: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  ingredient: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  textView: {display: 'flex', flexDirection: 'row', gap: 5},
});
