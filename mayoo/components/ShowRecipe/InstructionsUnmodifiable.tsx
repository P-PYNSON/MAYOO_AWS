import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type InstructionsUnmodifiableProps = {
  instructions: string[];
};

export default function InstructionsUnmodifiable({
  instructions,
}: InstructionsUnmodifiableProps) {
  return (
    <View style={styles.main}>
      <Text style={styles.ingredientsText}> 📋 Instructions 📋</Text>
      <View style={styles.instructionsView}>
        {instructions.map((instruction, index) => (
          <View key={index} style={styles.instruction}>
            <Text style={styles.instructionH1}>Step {index + 1}</Text>
            <Text style={styles.instructionText}>{instruction}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientsText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 20,
  },
  instructionsView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  instruction: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap:10,
  },
  instructionH1:{fontSize:20, color:'black'},
  instructionText:{fontSize:18,}
});
