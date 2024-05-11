import React, {useState} from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {listRecipes} from '../../src/graphql/queries';
import {importedRecipe} from '../../types/recipeTypes';

const client = generateClient();

interface RecipeShearchBarProps {
  recipesList: importedRecipe[];
  setFilteredList: (recipes: importedRecipe[]) => void;
  setDataLoading: (boolean: boolean) => void;
  setListLength: (number: number) => void;
}

const RecipeShearchBar = ({
  setListLength,
  setFilteredList,
  setDataLoading,
  recipesList,
}: RecipeShearchBarProps) => {
  const [inputText, setInputText] = useState('');

  const recipeData = async () => {
    try {
      const recipesListArray = recipesList.filter(recipe =>
        recipe.name.toLowerCase().includes(inputText.toLowerCase()),
      );
      console.log(recipesListArray.length);

      setListLength(recipesListArray.length);
      setFilteredList(recipesListArray);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.main}>
      <TextInput
        style={styles.textInput}
        value={inputText}
        onChangeText={text => {
          setInputText(text);
        }}></TextInput>
      <Button onPress={() => recipeData()} title="search"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  textInput: {
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  button: {width: '20%'},
  buttonText: {},
});

export default RecipeShearchBar;
