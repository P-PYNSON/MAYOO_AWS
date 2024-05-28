import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {listRecipes, getRecipe, listLists} from '../src/graphql/queries';
import {importedRecipe, newRecipe} from '../types/recipeTypes';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RecipesListCard from '../components/recipeList/RecipeListCard';
import {importedList} from '../types/listsTypes';

const client = generateClient();

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const MyLists: React.FC<HomeScreenProps> = ({navigation}) => {
  const [listsList, setListsList] = useState([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const recipeData = async () => {
    try {
      const listsList: GraphQLResult<any> = await client.graphql({
        query: listLists,
      });
      setListsList(listsList.data.listLists.items);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      recipeData();
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/images/background.webp')}
      style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.main}>
        {dataLoading && <ActivityIndicator size={'large'}></ActivityIndicator>}
        <View style={styles.mainView}>
          {listsList.length > 0 &&
            listsList.map((list: importedList, index: number) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ShowList', {routeList: list});
                }}
                style={styles.listCard}
                key={index}>
                <Text style={styles.text}>{list.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {width: '100%', height: '100%'},
  main: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 30,
    position: 'relative',
    padding: 10,
    paddingBottom: 20,
  },
  listCard: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    elevation: 10,
  },
  text: {
    fontSize: 22,
    color: 'orange',
    fontFamily: 'casual',
  },
});

export default MyLists;
