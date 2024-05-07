import React, {useEffect, useState} from 'react';
import {Ingredient} from '../../types/recipeTypes';
import {
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

interface IngredientQuantModalProps {
  selectedIngredient: Ingredient;
  ingredientIndex: number | null;
  addIngredientToList: (ingredient: Ingredient) => void;
  setShowModal: (bool: boolean) => void;
}

const ListIngredientQuantModal = ({
  selectedIngredient,
  ingredientIndex,
  addIngredientToList,
  setShowModal,
}: IngredientQuantModalProps) => {
  const [unitSelected, setUnitSelected] = useState(
    selectedIngredient.unit ? selectedIngredient.unit : 'g',
  );
  const [quantity, setQuantity] = useState(
    selectedIngredient.quantity ? selectedIngredient.quantity.toString() : '',
  );

  const possibleUnits = [
    {key: '1', value: 'g'},
    {key: '2', value: 'kg'},
    {key: '3', value: 'ml'},
    {key: '4', value: 'cl'},
    {key: '5', value: 'L'},
    {key: '6', value: 'piece'},
  ];

  function addtoIngredientsList() {
    try {
      const ingredient = {
        image: selectedIngredient?.image,
        name: selectedIngredient.name,
        //set quantity to zero if nothing is selected. Allow to put a placeholder to avoit weird interaction when initiated to 0 instead.
        quantity: quantity.length > 0 ? parseFloat(quantity) : 0,
        //weird interaction with library when no unit selected and default is used. Uses Key instead of value?
        unit: unitSelected == '1' ? 'g' : unitSelected,
      };
      console.log('ingredient before function:', ingredient);
      addIngredientToList(ingredient);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(selectedIngredient);
    console.log(ingredientIndex);
  }, [selectedIngredient]);

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.imageBox}>
        <Image
          style={{width: 120, height: 120, borderRadius: 200}}
          source={{
            uri: `https://spoonacular.com/cdn/ingredients_250x250/${selectedIngredient?.image}`,
          }}
        />
        <Text style={{fontSize: 20}}>{selectedIngredient?.name}</Text>
        <View style={styles.inputsView}>
          <TextInput
            style={styles.textInput}
            value={quantity}
            keyboardType="numeric"
            onChangeText={(text: string) => {
              setQuantity(text);
            }}
            placeholder="0"></TextInput>

          <SelectList
            dropdownStyles={styles.selector}
            dropdownTextStyles={styles.dropdownTextStyles}
            setSelected={(val: string) => setUnitSelected(val)}
            data={possibleUnits}
            save="value"
            defaultOption={{key: '1', value: 'g'}}
          />
        </View>
        <Pressable
          style={styles.addOrModifyButton}
          onPress={() => {
            addtoIngredientsList();
            setShowModal(false);
          }}>
          <Text style={styles.buttonsText}>add ingredient !</Text>
        </Pressable>
        <Pressable
          style={styles.removeOrCancelButton}
          onPress={() => {
            setShowModal(false);
          }}>
          <Text style={styles.buttonsText}>cancel</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  imageBox: {
    elevation: 30,
    borderWidth: 2,
    borderColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '90%',
    maxHeight: 400,
    width: '95%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
  },
  inputsView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    width: '100%',
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    width: '50%',
    textAlign: 'right',
    paddingHorizontal: 20,
  },
  selector: {
    position: 'absolute',
    alignItems: 'center',
    top: 40, // Adjust as needed
    left: 0,
    right: 0,
    zIndex: 999,
    width: 110,
    backgroundColor: 'white',
  },
  dropdownTextStyles: {fontSize: 24},
  addOrModifyButton: {
    backgroundColor: '#4ec9e1',
    borderWidth: 1,
    borderColor: 'gray',
    width: '60%',
    marginTop: 20,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  removeOrCancelButton: {
    backgroundColor: '#fd5959',
    borderWidth: 1,
    borderColor: 'gray',
    width: '60%',
    marginTop: 20,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonsText: {color: 'black', fontSize: 18, textTransform: 'uppercase'},
});

export default ListIngredientQuantModal;
