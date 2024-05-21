import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getCurrentUser} from 'aws-amplify/auth';
import {BlurView} from '@react-native-community/blur';

interface friendCardProps {
  friendName: string;
  entryId: string;
  fetchFriends: () => void;
}

const FriendCard = ({friendName, entryId, fetchFriends}: friendCardProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  async function deleteFriend(entryId: string) {
    setDataLoading(true);
    const {userId} = await getCurrentUser();
    console.log(entryId, userId);

    try {
      const response = await fetch(
        `https://r7c300pz02.execute-api.eu-north-1.amazonaws.com/dev/delete`,
        {
          method: 'POST',
          body: JSON.stringify({
            firstEntryId: entryId,
            sencondEntryFriendSub: userId,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const responseData = await response.json();
      const {message} = responseData;
      console.log('message:', message);
      fetchFriends();
      setMessage(message);
      setDataLoading(false);
    } catch (error) {
      console.log('lambda error', error);
      setDataLoading(false);
    }
  }

  return (
    <View style={styles.friendCard}>
      <TouchableOpacity
        onPress={() => {
          setShowOptions(!showOptions);
        }}>
        <Text style={styles.textViewText}>{friendName}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View>
          {dataLoading && <ActivityIndicator></ActivityIndicator>}
          {!dataLoading && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => deleteFriend(entryId)}>
              <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={6}
              />
              <Text style={styles.optionsButtonsText}>Remove friend</Text>
            </TouchableOpacity>
          )}
          <Text>{message}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  friendCard: {
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textViewText: {
    fontSize: 20,
    fontFamily: 'casual',
    fontWeight: 'bold',
    color: 'orange',
  },
  removeButton: {
    padding: 10,
    borderRadius: 10,
    width: '80%',
    backgroundColor: '#f95959',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  optionsButtonsText: {fontFamily: 'Coffee', fontSize: 18, color: 'white'},
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default FriendCard;
