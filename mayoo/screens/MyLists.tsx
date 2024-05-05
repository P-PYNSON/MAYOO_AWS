import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
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
      console.log(listsList.data.listLists.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      recipeData();
      console.log('reloaded');
    });
  }, [navigation]);

  return (
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
              <Text>{list.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  },
  listCard: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default MyLists;
