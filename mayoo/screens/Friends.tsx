import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, View} from 'react-native';
import {GraphQLResult, generateClient} from 'aws-amplify/api';
import {listFriends} from '../src/graphql/queries';
import {importedFriends} from '../types/friendsTypes';
import {getCurrentUser} from 'aws-amplify/auth';

const client = generateClient();

const Friends = () => {
  const [friendList, setFriendList] = useState<importedFriends[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

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
    } catch (error) {
      console.log('lambda error', error);
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

  async function deleteFriend(entryId: string) {
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
      console.log(responseData);
    } catch (error) {
      console.log('lambda error', error);
    }
  }

  useEffect(() => {
    fetchFriendsList();
  }, []);

  return (
    <View>
      {dataLoading && <ActivityIndicator></ActivityIndicator>}
      <Button
        title="send email"
        onPress={() => {
          invokeLambdaFunction('velwitch@gmail.com');
        }}></Button>
      <Button
        title="add friends"
        onPress={() => {
          invokeFriends();
        }}></Button>
      <Button
        title="delete friends"
        onPress={() => {
          deleteFriend('mijoh421lllwezvx6n_a');
        }}></Button>
    </View>
  );
};

export default Friends;
