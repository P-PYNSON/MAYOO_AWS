import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

interface RecipeNameProps {
  setName: (text: string) => void;
  setCategory: (text: string) => void;
  setImage: (text: string) => void;
  data: {
    name: string | undefined;
    image: string | undefined;
  };
}

export default function RecipeName({setName, setImage, data}: RecipeNameProps) {
  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
        includeBase64: true,
      });

      try {

        if (data.image) {
          //delete previous image from system for obvious optimisation reasons
          await RNFS.unlink(data.image);
          console.log(`File at ${data.image} has been deleted successfully.`);
        }

        setImage(image.path);
      } catch (error) {
        console.error(`Error deleting file at ${data.image}:`, error);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        onPress={() => {
          handleImagePicker();
        }}
        style={styles.imageView}>
        {data.image && data.image != '' && (
          <Image
            style={styles.image}
            source={{
              uri: data.image,
            }}></Image>
        )}
      </TouchableOpacity>
      <View style={styles.inputView}>
        <Text style={styles.text}>Recipe Name</Text>
        <TextInput
          maxLength={80}
          style={styles.textInput}
          value={data.name}
          onChangeText={(text: string) => {
            setName(text);
          }}
          placeholder=""></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: '90%',
    gap: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    width: '90%',
    height: 200,
    backgroundColor: 'gray',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  inputView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: 20,
    textAlign: 'center',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: 'black',
  },
  textInput: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
  },
});
