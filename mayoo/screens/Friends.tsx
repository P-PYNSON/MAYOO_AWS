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
      const {userName, userSub, userEmail} = responseData;
      console.log('userName:', userName);
      console.log('userSub:', userSub);
      console.log('userEmail:', userEmail);
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
        title="add friend"
        onPress={() => {
          invokeLambdaFunction('velwitch@gmail.com');
        }}></Button>
    </View>
  );
};

export default Friends;
