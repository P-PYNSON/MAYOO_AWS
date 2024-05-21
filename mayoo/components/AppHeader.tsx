import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAuthenticator} from '@aws-amplify/ui-react-native';

export default function AppHeader() {
  const userSelector = (context: {user: any}) => [context.user];
  const {user, signOut} = useAuthenticator(userSelector);
  const navigation = useNavigation();
  return (
    <View style={styles.mainView}>
      <Image
        style={styles.image}
        source={require('../assets/images/mayooCropped.png')}></Image>
      <Text style={styles.text}>Hi {user.username} :3</Text>
      <TouchableOpacity onPress={signOut}>
        <Image
          style={styles.icon}
          source={require('../assets/icons/gears.png')}></Image>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {color: 'black', fontSize: 20},
  image: {
    borderRadius: 50,
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
