import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {handleSignIn} from '../auth/signIn';
import ConfirmEmailModal from '../components/auth/ConfirmEmailModal';
import {resendSignUpCode} from 'aws-amplify/auth';

export default function SignIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View>
      <TextInput
        value={userName}
        onChangeText={(text: string) => {
          setUserName(text);
        }}
        placeholder="User name..."></TextInput>

      <TextInput
        value={password}
        onChangeText={(text: string) => {
          setPassword(text);
        }}
        placeholder="Password..."></TextInput>

      <Button
        title="register"
        onPress={() => {
          handleSignIn({username: userName, password: password});
        }}></Button>

      <Button
        title="resend code"
        onPress={() => {
          resendSignUpCode({username: userName});
        }}></Button>

      {/* <ConfirmEmailModal></ConfirmEmailModal> */}
    </View>
  );
}
