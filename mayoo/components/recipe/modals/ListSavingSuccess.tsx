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

interface ListSavingSuccessProps {
  closeModal: () => void;
}

const ListSavingSuccess = ({closeModal}: ListSavingSuccessProps) => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation();

  return (
    <View style={styles.main}>
      <Text style={styles.text}> 🥳 List Saved ! 🎉</Text>
      <TouchableOpacity
        style={styles.navigationButtons}
        onPress={() => {
          navigation.navigate('MyLists');
        }}>
        <Text style={styles.navigationButtonsText}>My Lists</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navigationButtons}
        onPress={() => {
          closeModal();
        }}>
        <Text style={styles.navigationButtonsText}>Close</Text>
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
    gap: 40,
  },
  text: {fontSize: 28, marginBottom: 40, color: 'black'},
  navigationButtons: {
    width: '80%',
    backgroundColor: '#e3e3e3',
    elevation: 10,
    padding: 10,
    borderRadius: 10,
  },
  navigationButtonsText: {fontSize: 22, width: '100%', textAlign: 'center'},
});

export default ListSavingSuccess;
