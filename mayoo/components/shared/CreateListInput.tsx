import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {generateClient} from 'aws-amplify/api';
import {createList} from '../../src/graphql/mutations';
const client = generateClient();

const CreateListInput = () => {
  const [name, setName] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [savingList, setSavingList] = useState<boolean>(false);
  const [showSavingButton, setShowSavingButton] = useState<boolean>(true);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const createNewList = async () => {
    setSavingList(true);
    setShowSavingButton(false);
    try {
      const newList = await client.graphql({
        query: createList,
        variables: {
          input: {name: name.length > 0 ? name : `${day}/${month}/${year}`},
        },
      });
      console.log(newList);
      setSavingList(false);
      setValidationMessage('saved');
    } catch (error) {
      console.log(error);
      setSavingList(false);
      setValidationMessage('error');
    }
  };

  return (
    <View style={styles.inputView}>
      <Text style={styles.title}>Create new list</Text>
      <Text style={styles.text}>List Name</Text>
      <TextInput
        maxLength={80}
        style={styles.textInput}
        value={name}
        onChangeText={(text: string) => {
          setName(text);
        }}
        placeholder={`${day}/${month}/${year}`}></TextInput>
      <View style={styles.activityBox}>
        {showSavingButton && (
          <TouchableOpacity onPress={createNewList} style={styles.createView}>
            <Text style={styles.createViewText}>Create</Text>
          </TouchableOpacity>
        )}
        {savingList && <ActivityIndicator></ActivityIndicator>}
        {!showSavingButton && <Text>{validationMessage}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 22},
  text: {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: 20,
    textAlign: 'center',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: 'black',
    marginTop: 10,
  },
  textInput: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  activityBox:{marginTop:10},
  createView: {
    padding: 10,
    borderRadius: 10,
    width: 200,
    backgroundColor: '#79c2d0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  createViewText: {color: 'white'},
});

export default CreateListInput;
