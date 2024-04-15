import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAuthenticator} from '@aws-amplify/ui-react-native';

const userSelector = (context: {user: any}) => [context.user];

export default function AppHeader() {
  const {user} = useAuthenticator(userSelector);
  const navigation = useNavigation();
  return (
    <View style={styles.mainView}>
      <Image
        style={styles.image}
        source={require('../assets/images/mayooCropped.png')}></Image>
      <Text style={styles.text}>Hi {user.username} :3</Text>

      <Image
        style={styles.icon}
        source={require('../assets/icons/gears.png')}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    paddingLeft:5,
    paddingRight:20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {color: 'black', fontSize: 20, },
  image: {
    borderRadius:50,
    width: 50,
    height: 50,
    resizeMode: 'center',
  },
  iconView: {width: 50, height: 50},
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'center',
  },
});
