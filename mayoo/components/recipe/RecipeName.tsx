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
      {/* NAME INPUT */}
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

      {/* IMAGE SELECTOR */}
      <TouchableOpacity
        onPress={() => {
          handleImagePicker();
        }}
        style={styles.imageView}>
        {!data.image && (
            <View style={styles.imageTextView}>
              <Text style={styles.imageText}>Add Image</Text>
            </View>
          )}

        {data.image && data.image != '' && (
          <Image
            style={styles.image}
            source={{
              uri: data.image,
            }}></Image>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    gap: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    backgroundColor: 'black',
  },
  imageTextView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    elevation: 15,
  },
  imageText: {fontSize: 24, color: 'black'},
  image: {
    width: '80%',
    height: '95%',
    backgroundColor: 'black',
    resizeMode: 'cover',
    
  },
  inputView: {
    width: '90%',
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
    textAlign: 'center',
    fontSize: 20,
  },
});
