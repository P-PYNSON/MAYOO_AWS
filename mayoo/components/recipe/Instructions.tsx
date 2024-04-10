import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface InstructionsProps {
  setInstructions: (instructions: string[]) => void;
  instructions: string[];
}

export default function Instructions({
  setInstructions,
  instructions,
}: InstructionsProps) {
  function removeInstruction(index: number) {
    let instructionsToRemove = [...instructions];
    if (instructions.length > 1) {
      instructionsToRemove.splice(index, 1);
      setInstructions(instructionsToRemove);
    } else {
      instructionsToRemove[index] = '';
      setInstructions(instructionsToRemove);
    }
  }

  function changeInstructionsHandler(text: string, index: number) {
    let instructionsToChange = [...instructions];
    instructionsToChange[index] = text;
    setInstructions(instructionsToChange);
  }

  function addStep() {
    let currentSteps = [...instructions];
    currentSteps.push('');
    setInstructions(currentSteps);
  }

  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      <Text style={styles.text}>~ Instructions ~</Text>
      {instructions.map((instruction, index) => (
        <View style={styles.textInputMainView} key={index}>
          <Text style={styles.text}>Step {index + 1}</Text>
          <View style={styles.textInputView}>
            <TextInput
              multiline={true}
              returnKeyType={'done'}
              style={styles.textInput}
              value={instructions[index]}
              onChangeText={(text: string) => {
                changeInstructionsHandler(text, index);
              }}></TextInput>
            <Pressable
              onPress={() => {
                removeInstruction(index);
              }}>
              <Image
                source={require('../../assets/icons/closeIcon.png')}
                style={styles.closeIcon}></Image>
            </Pressable>
          </View>
        </View>
      ))}
      <Pressable
        onPress={() => {
          addStep();
        }}>
        <Text>Add step</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    maxWidth: '90%',
    minWidth: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 20,
    gap: 10,
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  textInputMainView: {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  textInput: {
    width: '80%',
    minWidth: '80%',
    maxWidth: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 18,
  },
  closeIcon: {width: 30, height: 30},
  addStep:{},
});
