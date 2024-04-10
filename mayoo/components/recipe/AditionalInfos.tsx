import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface AditionalInfosProps {
  data: {
    category?: string;
    servings?: string;
    prepTime?: string;
    cookTime?: string;
  };
  setCategory: (text: string) => void;
  setServings: (number: string) => void;
  setPrepTime: (number: string) => void;
  setCookTime: (number: string) => void;
}

export default function AditionalInfos({
  data,
  setCategory,
  setServings,
  setPrepTime,
  setCookTime,
}: AditionalInfosProps) {
  return (
    <View style={styles.mainView}>
      <Text style={styles.mainText}>Additionals informations (optional)</Text>
      <View style={styles.inputView}>
        <Text style={styles.text}> Category</Text>
        <TextInput
          style={styles.textInput}
          value={data.category}
          onChangeText={(text: string) => {
            setCategory(text);
          }}
          placeholder=""></TextInput>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.text}>Servings</Text>
        <TextInput
          style={styles.textInput}
          value={data.servings}
          keyboardType="numeric"
          onChangeText={(text: string) => {
            setServings(text);
          }}
          placeholder=""></TextInput>
      </View>
      <View style={styles.timersView}>
        <View style={styles.timerInputView}>
          <Text style={styles.timerText}>Prep Time</Text>
          <TextInput
            style={styles.textInput}
            value={data.prepTime}
            keyboardType="numeric"
            onChangeText={(text: string) => {
              setPrepTime(text);
            }}
            placeholder=""></TextInput>
          <Text style={styles.bottomTimerText}>(mn)</Text>
        </View>
        <View style={styles.timerInputView}>
          <Text style={styles.timerText}>Cook Time</Text>
          <TextInput
            style={styles.textInput}
            value={data.cookTime}
            keyboardType="numeric"
            onChangeText={(text: string) => {
              setCookTime(text);
            }}
            placeholder=""></TextInput>
          <Text style={styles.bottomTimerText}>(mn)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    elevation: 20,
    gap: 20,
    paddingVertical: 20,
  },
  mainText: {fontSize: 20, textAlign: 'center'},
  inputView: {display: 'flex', justifyContent: 'center', alignItems: 'center'},
  timersView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  timerInputView: {width: '40%', alignItems: 'center'},
  text: {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: 20,
    textAlign: 'center',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'black',
  },
  textInput: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  timerText: {
    width: '90%',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 20,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'black',
  },
  bottomTimerText: {},
});
