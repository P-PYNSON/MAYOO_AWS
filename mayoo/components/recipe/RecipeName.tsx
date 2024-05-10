import React, {useEffect, useState} from 'react';
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
import {getUrl} from 'aws-amplify/storage';

interface RecipeNameProps {
  recipeId?: string;
  previousImage?: string;
  setName: (text: string) => void;
  setCategory: (text: string) => void;
  setImage: (text: string) => void;
  setImagePath: (text: string) => void;
  data: {
    name: string | undefined;
    image: string | undefined;
  };
}

type indentityId = {
  identityId: string;
};

export default function RecipeName({
  setName,
  setImage,
  data,
  recipeId,
  setImagePath,
  previousImage,
}: RecipeNameProps) {
  const [recipeImageUrl, setRecipeImageUrl] = useState<string | null>();

  const handleImagePicker = async () => {
    try {
      await ImagePicker.openPicker({
        width: 800,
        height: 600,
        cropping: true,
        mediaType: 'photo',
        includeBase64: true,
      }).then(async image => {
        try {
          const uri = `data:${image.mime};base64,${image.data}`;
          if (uri) {
            setRecipeImageUrl(uri);
            setImagePath(image.path);
            setImage(`recipes/${image.path}.${image.mime}`);
          }
        } catch (error) {
          console.error(
            `Error setting image name and path ${data.image}:`,
            error,
          );
        }
      });
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const createImageUrl = async () => {
    if (data.image) {
      console.log('data image', data.image);

      const getUrlResult = await getUrl({
        key: data.image,
        options: {accessLevel: 'private'},
      });
      console.log(getUrlResult.url);
      setRecipeImageUrl(String(getUrlResult.url));
    }
  };

  /*   const handleImagePicker = async () => {
    try {
      await launchImageLibrary({mediaType: 'photo'}, async response => {
        if (
          !response.didCancel &&
          response.assets &&
          response.assets.length > 0
        ) {
          const fileName = response.assets[0].fileName;
          const uri = response.assets[0].uri;
          if (uri) {
            setRecipeImageUrl(uri);
            const imageBlob = await fetch(uri);
            const blob = await imageBlob.blob();

            const result = await uploadData({
              key: `recipes/2024/${fileName}`,
              data: blob,
              options: {
                accessLevel: 'private',
                contentType: 'image',
              },
            });
            console.log('Upload result:', result);
            setImage(`recipes/2024/${fileName}`);

            if (previouslyUploadedImage) {
              try {
                await remove({
                  key: previouslyUploadedImage,
                  options: {
                    accessLevel: 'private', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
                  },
                });
              } catch (error) {
                console.log('Error ', error);
              }
            }
          }
        }
      });
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  }; */

  useEffect(() => {
    if (recipeId) {
      createImageUrl();
      console.log('url creation started');
    }
  }, [previousImage]);

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

        {recipeImageUrl && recipeImageUrl != '' && (
          <Image
            style={styles.image}
            source={{
              uri: recipeImageUrl,
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
