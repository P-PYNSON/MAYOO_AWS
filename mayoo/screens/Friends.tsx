import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {listFriends} from '../src/graphql/queries';
import {importedFriends} from '../types/friendsTypes';
import {getCurrentUser} from 'aws-amplify/auth';
import FriendCard from '../components/friends/FriendCard';

const client = generateClient();

const Friends = () => {
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [friendList, setFriendList] = useState<importedFriends[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [requestLoading, setRequestLoading] = useState<boolean>(false);

  const fetchFriendsList = async () => {
    try {
      const recipeFriends: GraphQLResult<any> = await client.graphql({
        query: listFriends,
        variables: {},
      });
      console.log(recipeFriends.data.listFriends.items);
      setFriendList(recipeFriends.data.listFriends.items);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function invokeLambdaFunction(email: string) {
    try {
      setRequestLoading(true);
      const {username, userId} = await getCurrentUser();
      const response = await fetch(
        `https://jnt22hp2fj.execute-api.eu-north-1.amazonaws.com/dev/sendEmail`,
        {
          method: 'POST',
          body: JSON.stringify({
            senderId: userId,
            senderName: username,
            targetEmail: email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const responseData = await response.json();
      const {message} = responseData;
      console.log('message:', message);
      setMessage(message);
      setRequestLoading(false);
    } catch (error) {
      console.log('lambda error', error);
      setRequestLoading(false);
    }
  }
  async function invokeFriends() {
    try {
      const response = await fetch(
        `https://r7c300pz02.execute-api.eu-north-1.amazonaws.com/dev/addFriends/mijoh421lllwezvx6n/255ecce9add85cec4c2c7665e9f13591`,
        {
          method: 'GET',
        },
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log('lambda error', error);
    }
  }

  useEffect(() => {
    fetchFriendsList();
  }, []);

  return (
    <View style={styles.main}>
      {dataLoading && <ActivityIndicator></ActivityIndicator>}
      <View style={[styles.main, styles.friendsMain]}>
        {friendList.map((friend, index) => (
          <FriendCard
            fetchFriends={() => {
              fetchFriendsList();
            }}
            friendName={friend.friendName}
            entryId={friend.id}
            key={index}></FriendCard>
        ))}
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="enter friend's email"
        value={email}
        onChangeText={text => {
          setEmail(text);
        }}></TextInput>
      {!requestLoading && (
        <Button
          title="send friend request"
          onPress={() => {
            if (email) {
              invokeLambdaFunction(email);
            } else {
              setMessage("Please enter your friend's email adress");
            }
          }}></Button>
      )}
      {requestLoading && <ActivityIndicator></ActivityIndicator>}
      <Text>{message}</Text>
      {/*  <Button
        title="add friends"
        onPress={() => {
          invokeFriends();
        }}></Button>
      <Button
        title="delete friends"
        onPress={() => {
          deleteFriend('mijoh421lllwezvx6n_a');
        }}></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  friendsMain: {borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 10},
  textInput: {width: '80%', borderWidth: 1, borderColor: 'gray', marginTop: 10},
  friendCard: {
    width: '80%',
    backgroundColor: 'white',
    height: 40,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default Friends;
