import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function SignInHeader() {
  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>Mayoo</Text>
      <Image
        source={require('../../assets/images/mayooCropped.png')}
        style={styles.image}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: '33%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth:1,
  },
  text: {color:'pink', fontSize:32, fontWeight:'bold'},
  image: {
    width: '100%',
    height: '100%',   
    resizeMode: 'center',
  },
});
