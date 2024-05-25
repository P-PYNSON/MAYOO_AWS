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
import {Observable} from 'rxjs';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {listFriends} from '../../src/graphql/queries';
import {updateList, updateRecipe} from '../../src/graphql/mutations';
import {importedList} from '../../types/listsTypes';
import {importedRecipe} from '../../types/recipeTypes';
const client = generateClient();

interface AddFriendProps {
  data: importedList | importedRecipe;
  setList?: (list: importedList) => void;
  setRecipe?: (recipe: importedRecipe) => void;
}

const AddFriend = ({data, setList, setRecipe}: AddFriendProps) => {
  const [showFriends, setShowFriends] = useState(false);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [friendList, setFriendList] = useState<importedFriends[]>();
  const [addFriendMessage, setAddFriendMessage] = useState<string>();

  const addFriendToList = async (
    newAthorSub: string,
    newAuthorName: string,
  ) => {
    let newAuthorsArray = [...data.authors];

    if (!newAuthorsArray.includes(newAuthorName)) {
      try {
        newAuthorsArray.push(newAthorSub + '::' + newAuthorName);
        const newRecipe = await client.graphql({
          query: updateList,
          variables: {
            input: {id: data.id, authors: newAuthorsArray},
          },
        });

        if (newRecipe instanceof Observable) {
          newRecipe.subscribe({
            next: response => {
              if (setList) {
                setList(response.data.updateList);
              }
              fetchFriendsList();
              setAddFriendMessage('friend added!');
            },
            error: error => {
              console.error(error);
              setAddFriendMessage('Request error');
            },
          });
        } else {
          if (setList) {
            setList(newRecipe.data.updateList);
            fetchFriendsList();
          }
          setAddFriendMessage('friend added!');
        }
      } catch (error) {
        console.log(error);
        setAddFriendMessage('Request error');
      }
    } else {
      setAddFriendMessage('Friend already added');
    }
  };

  const addFriendToRecipe = async (
    newAthorSub: string,
    newAuthorName: string,
  ) => {
    let newAuthorsArray = [...data.authors];

    if (!newAuthorsArray.includes(newAuthorName)) {
      try {
        newAuthorsArray.push(newAthorSub + '::' + newAuthorName);
        const newRecipe = await client.graphql({
          query: updateRecipe,
          variables: {
            input: {id: data.id, authors: newAuthorsArray},
          },
        });

        if (newRecipe instanceof Observable) {
          newRecipe.subscribe({
            next: response => {
              if (setRecipe) {
                setRecipe(response.data.updateRecipe);
              }
              fetchFriendsList();
              setAddFriendMessage('friend added!');
            },
            error: error => {
              console.error(error);
              setAddFriendMessage('Request error');
            },
          });
        } else {
          if (setRecipe) {
            setRecipe(newRecipe.data.updateRecipe);
            fetchFriendsList();
          }
          setAddFriendMessage('friend added!');
        }
      } catch (error) {
        console.log(error);
        setAddFriendMessage('Request error');
      }
    } else {
      setAddFriendMessage('Friend already added');
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
                    if (!data.authors.includes(friend.friendName)) {
                      if (setList) {
                        addFriendToList(friend.friendSub, friend.friendName);
                      }
                      if (setRecipe) {
                        addFriendToRecipe(friend.friendSub, friend.friendName);
                      }
                    } else {
                      setAddFriendMessage('Friend already added');
                    }
                  }}>
                  <View style={styles.textAndImageView}>
                    <Text style={styles.friendEntryButtonText}>
                      {friend.friendName}
                    </Text>
                    {data.authors.includes(friend.friendName) && (
                      <Image
                        style={styles.friendEntryButtonImage}
                        source={require('../../assets/icons/check.png')}></Image>
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.messageText}>{addFriendMessage}</Text>
              </View>
            ))}
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

export default AddFriend;
