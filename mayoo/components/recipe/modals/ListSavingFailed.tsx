import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

interface ListSavingFailedProps {
  closeModal: () => void;
}

const ListSavingFailed = ({closeModal}: ListSavingFailedProps) => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation();

  return (
    <View style={styles.main}>
      <Text style={{fontSize: 28, color: 'black'}}>😬</Text>
      <Text style={styles.text}> Error while saving the list</Text>
      <TouchableOpacity
        style={styles.navigationButtons}
        onPress={() => {
            closeModal();
        }}>
        <Text style={styles.navigationButtonsText}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navigationButtons}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={styles.navigationButtonsText}>Main Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {fontSize: 28},
  navigationButtons: {
    width: '80%',
    backgroundColor: '#e3e3e3',
    elevation: 10,
    padding: 10,
    borderRadius: 10,
    marginTop: 40,
  },
  navigationButtonsText: {fontSize: 22, width: '100%', textAlign: 'center'},
});

export default ListSavingFailed;
