import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Ingredient} from '../../types/recipeTypes';
import {fetchSpoon} from '../../amplify/backend/api/fetchSpoonIngredient/functions';
import IngredientQuantModal from './IngredientQuantModal';

interface RecipeIngredientsProps {
  setServings: (number: string) => void;
  setIngredients: (ingredients: Ingredient[]) => void;
  data: {servings: string | undefined; ingredients: Ingredient[] | undefined};
}

export default function RecipeIngredients({
  setServings,
  setIngredients,
  data,
}: RecipeIngredientsProps) {
  const [searchedIngredientInput, setSearchedIngredientInput] =
    useState<string>('');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();
  const [fecthedIngredientsList, setFetchedIngredientsList] = useState<
    Ingredient[]
  >([]);
  const [isSpoonFetching, setIsSpoonFetching] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  //call to spoonacular api with delay to reduce calls and minimum string size
  async function fetchSpoonHandler(text: string) {
    clearTimeout(debounceTimer.current);

    if (text.length > 2) {
      setIsSpoonFetching(true);
      debounceTimer.current = setTimeout(async () => {
        try {
          const data = await fetchSpoon(text);
          setFetchedIngredientsList(data);
          setIsSpoonFetching(false);
        } catch (error) {
          console.log(error);
        }
      }, 1500);
    }
  }

  //show modal to set ingredients quantity and mesuring init
  function selectIngredientHandler(element: Ingredient) {
    setSelectedIngredient(element);
    setShowModal(true);
  }

  return (
    <View style={styles.mainView}>
      {/* Servings Input */}
      <View style={styles.inputView}>
        <Text style={styles.text}>Servings</Text>
        <TextInput
          style={styles.textInput}
          value={data.servings}
          keyboardType="numeric"
          onChangeText={(text: string) => {
            setServings(text);
          }}
          placeholder=""></TextInput>
      </View>

      {/* ingredient search Input */}
      <View style={styles.inputView}>
        <Text style={styles.text}> Add ingredients</Text>
        <View style={styles.inputViewBox}>
          <TextInput
            style={styles.textInput}
            value={searchedIngredientInput}
            onChangeText={(text: string) => {
              setSearchedIngredientInput(text);
              fetchSpoonHandler(text);
            }}
            placeholder=""></TextInput>
          <View style={styles.activityIconView}>
            {isSpoonFetching && (
              <ActivityIndicator size={'large'}></ActivityIndicator>
            )}
          </View>
        </View>
      </View>

      {/* List of returned ingredient from Spoon */}
      <ScrollView style={styles.fetchedIngredientBox}>
        {fecthedIngredientsList.map((element, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              selectIngredientHandler(element);
            }}>
            <View style={styles.ingredientsShearchResults}>
              <Image
                style={{width: 40, height: 40, borderRadius: 200}}
                source={{
                  uri: `https://spoonacular.com/cdn/ingredients_250x250/${element.image}`,
                }}
              />
              <Text style={{alignSelf: 'center', color: 'black', fontSize: 18}}>
                {element.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Ingredients quantity modal */}
      <Modal
        visible={selectedIngredient != undefined && showModal}
        animationType="slide"
        transparent={true}
        style={styles.modalView}>
        <IngredientQuantModal
          setShowModal={setShowModal}
          data={selectedIngredient}
          setIngredients={setIngredients}></IngredientQuantModal>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {width: '90%', gap: 20},
  inputView: {display: 'flex', justifyContent: 'center', alignItems: 'center'},
  inputViewBox: {position: 'relative', width: '100%'},
  activityIconView: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
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
    fontSize: 18,
  },
  fetchedIngredientBox: {display: 'flex', marginTop: -20},
  ingredientsShearchResults: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 40,
    gap: 10,
    padding: 4,
    height: 65,
  },
  modalView: {},
});
