import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface RecipeNameProps {
  setName: (text: string) => void;
  setCategory: (text: string) => void;
  setImage: (text: string) => void;
  data: {name: string | undefined; category: string | undefined; image: string | undefined};
}

export default function RecipeName({
  setName,
  setCategory,
  setImage,
  data,
}: RecipeNameProps) {
  return (
    <View style={styles.mainView}>
      <View style={styles.inputView}>
        <Text style={styles.text}>Recipe Name</Text>
        <TextInput
          style={styles.textInput}
          value={data.name}
          onChangeText={(text: string) => {
            setName(text);
          }}
          placeholder=""></TextInput>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.text}> Category</Text>
        <TextInput
          style={styles.textInput}
          value={data.name}
          onChangeText={(text: string) => {
            setCategory(text);
          }}
          placeholder=""></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {width: '90%', gap: 20},
  inputView: {display: 'flex', justifyContent: 'center', alignItems: 'center'},
  text: {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: 20,
    textAlign: 'center',
    borderTopWidth: 2,
    borderLeftWidth:2,
    borderRightWidth:2,
    borderColor: 'black',
  },
  textInput: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
  },
});
