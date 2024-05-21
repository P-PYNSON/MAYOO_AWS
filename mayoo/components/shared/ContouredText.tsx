import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface contouredTextProps {
  children: string;
  fontSize:number; 
}

const ContouredText = ({children, fontSize}: contouredTextProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontSize:fontSize}]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Coffee',
    color: 'orange', // Text color
    textShadowColor: 'red', // Contour color
    textShadowOffset: {width: -2, height: -1}, // Contour offset (x, y)
    textShadowRadius: 10, // Contour radius
  },
});

export default ContouredText;
