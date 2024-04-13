import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
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
import IngredientsBox from './IngredientsBox';

interface RecipeIngredientsProps {
  setServings: (number: string) => void;
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
  data: {servings: string | undefined; ingredients: Ingredient[]};
}

export default function RecipeIngredients({
  setServings,
  ingredients,
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
  const [ingredientIndex, setIngredientIndex] = useState<number | null>(null);
  const [noResultMessage, setNoResultMessage] = useState<boolean>(false);

  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  //call to spoonacular api with delay to reduce calls and minimum string size
  async function fetchSpoonHandler(text: string) {
    clearTimeout(debounceTimer.current);
    setNoResultMessage(false);
    if (text.length > 2) {
      setIsSpoonFetching(true);
      debounceTimer.current = setTimeout(async () => {
        try {
          const data = await fetchSpoon(text);
          setFetchedIngredientsList(data);
          setIsSpoonFetching(false);
          Keyboard.dismiss();
          if(data.length < 1){
            setNoResultMessage(true);
          }
        } catch (error) {
          console.log(error);
        }
      }, 1500);
    }
  }

  //show modal to set ingredients quantity and mesuring init
  function selectIngredientHandler(element: Ingredient) {
    setIngredientIndex(null);
    setSelectedIngredient(element);
    setShowModal(true);
    setSearchedIngredientInput('');
    setFetchedIngredientsList([]);
  }

  return (
    <View style={styles.mainView}>
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
        {noResultMessage && (<Text style={styles.noResultsText}> No results for '{searchedIngredientInput}'</Text>)}
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

      {/* Box of added ingredients */}
      {ingredients.length > 0 && (
        <IngredientsBox
          ingredients={ingredients}
          setSelectedIngredient={setSelectedIngredient}
          setShowModal={setShowModal}
          setIngredientIndex={setIngredientIndex}></IngredientsBox>
      )}

      {/* Ingredients quantity modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        style={styles.modalView}>
        {selectedIngredient != undefined && (
          <IngredientQuantModal
            setShowModal={setShowModal}
            selectedIngredient={selectedIngredient}
            ingredientIndex={ingredientIndex}
            ingredients={ingredients}
            setIngredients={setIngredients}></IngredientQuantModal>
        )}
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
  noResultsText:{width:'100%', backgroundColor:'white', padding:10, textAlign:'center', fontSize:18},
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
