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
  setFilter: (string: string) => void;
  setPage: (number: number) => void;
  setCount: (number: number) => void;
  setList: (list: importedRecipe[]) => void;
  getRecipes: (page: string) => void;
}

const RecipeShearchBar = ({
  setFilter,
  setPage,
  setCount,
  setList,
  getRecipes,
}: RecipeShearchBarProps) => {
  const [inputText, setInputText] = useState('');

  return (
    <View style={styles.inputMain}>
      <TextInput
        style={styles.textInput}
        value={inputText}
        onChangeText={text => {
          setInputText(text);
          setFilter(text);
        }}></TextInput>
      <Button
        onPress={() => {
          setPage(0);
          setCount(0);
          setList([]);
          getRecipes('first');
        }}
        title="search"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputMain: {
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
