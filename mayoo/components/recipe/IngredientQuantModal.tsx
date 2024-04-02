import React from 'react';
import {Ingredient} from '../../types/recipeTypes';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';

interface IngredientQuantModalProps {
  data: Ingredient | undefined;
  setIngredients: (ingredients: Ingredient[]) => void;
  setShowModal: (bool: boolean) => void;
}

export default function IngredientQuantModal({
  data,
  setIngredients,
  setShowModal,
}: IngredientQuantModalProps) {
  return (
    <View style={styles.main}>
      <Image
        style={{width:120, height: 120, borderRadius: 200}}
        source={{
          uri: `https://spoonacular.com/cdn/ingredients_250x250/${data?.image}`,
        }}
      />
      <Text style={{fontSize:20}}>{data?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    elevation: 30,
    borderWidth: 2,
    borderColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '60%',
    width: '95%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
  },
});
