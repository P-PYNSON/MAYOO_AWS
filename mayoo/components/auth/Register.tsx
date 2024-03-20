import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {handleSignUp} from '../../auth/signUp';

export default function Register() {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  return (
    <View>
      <TextInput
        value={userName}
        onChangeText={(text: string) => {
          setUsername(text);
        }}
        placeholder="User name..."></TextInput>
      <TextInput
        value={email}
        onChangeText={(text: string) => {
          setEmail(text);
        }}
        placeholder="Email..."></TextInput>
      <TextInput
        value={password}
        onChangeText={(text: string) => {
          setPassword(text);
        }}
        placeholder="Password..."></TextInput>
      <TextInput
        value={confirmedPassword}
        onChangeText={(text: string) => {
          setConfirmedPassword(text);
        }}
        placeholder="Confirm Password..."></TextInput>
      <Button
        title="register"
        onPress={() => {
          handleSignUp({username: userName, password: password, email: email});
        }}></Button>
    </View>
  );
}
