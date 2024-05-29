import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {importedFriends} from '../../types/friendsTypes';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {listFriends} from '../../src/graphql/queries';
import {importedList} from '../../types/listsTypes';
import {importedRecipe} from '../../types/recipeTypes';
import {shareRecipe} from '../../amplify/backend/api/mayooRecipes/functions';
const client = generateClient();

interface AddFriendToRecipeProps {
  data: importedRecipe;
  setList?: (list: importedList) => void;
  setRecipe?: (recipe: importedRecipe) => void;
}

const AddFriendToRecipe = ({
  data,
  setList,
  setRecipe,
}: AddFriendToRecipeProps) => {
  const [showFriends, setShowFriends] = useState(false);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [friendList, setFriendList] = useState<importedFriends[]>();
  const [addFriendMessage, setAddFriendMessage] = useState<string>();

  const addFriendToRecipe = async (
    newAuthorSub: string,
    newAuthorName: string,
  ) => {
    try {
      const response = await shareRecipe(data.id, newAuthorSub, newAuthorName);
      setAddFriendMessage(response);
      fetchFriendsList();
    } catch (error) {
      setAddFriendMessage('error adding friend');
      console.log('error adding friend:', error);
    }
  };

  const fetchFriendsList = async () => {
    setLoadingFriends(true);
    try {
      const recipeFriends: GraphQLResult<any> = await client.graphql({
        query: listFriends,
        variables: {},
      });
      console.log(recipeFriends.data.listFriends.items);
      setFriendList(recipeFriends.data.listFriends.items);
      setLoadingFriends(false);
    } catch (error) {
      console.log(error);
      setLoadingFriends(false);
    }
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.addFriendButton}
        onPress={() => {
          if (!showFriends && !friendList) {
            fetchFriendsList();
          }
          setShowFriends(!showFriends);
          setAddFriendMessage('');
        }}>
        <Text style={styles.addFriendButtonText}>Add Friend</Text>
      </TouchableOpacity>
      {showFriends && loadingFriends && <ActivityIndicator></ActivityIndicator>}
      {showFriends && !loadingFriends && (
        <View style={styles.friendListMain}>
          {friendList &&
            friendList.map((friend, index) => (
              <View style={styles.friendEntryMain} key={index}>
                <TouchableOpacity
                  style={styles.friendEntryButton}
                  onPress={() => {
                    if (!data.sharedWith.includes(friend.friendName)) {
                      addFriendToRecipe(friend.friendSub, friend.friendName);
                    } else {
                      setAddFriendMessage('Friend already added');
                    }
                  }}>
                  <View style={styles.textAndImageView}>
                    <Text style={styles.friendEntryButtonText}>
                      {friend.friendName}
                    </Text>
                    {data.sharedWith.includes(friend.friendName) && (
                      <Image
                        style={styles.friendEntryButtonImage}
                        source={require('../../assets/icons/check.png')}></Image>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          <Text style={styles.messageText}>{addFriendMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFriendButton: {backgroundColor: '#79c2d0', padding: 10, borderRadius: 10},
  addFriendButtonText: {fontSize: 18, color: 'white'},
  friendListMain: {
    marginTop: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendEntryMain: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  friendEntryButton: {
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  textAndImageView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  friendEntryButtonText: {
    fontSize: 18,
    color: 'orange',
    fontFamily: 'casual',
    textAlign: 'center',
  },
  friendEntryButtonImage: {position: 'absolute', right: 5},
  messageText: {},
});

export default AddFriendToRecipe;
