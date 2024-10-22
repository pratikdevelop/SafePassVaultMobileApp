import React, { useState } from 'react';
import {  Text, TextInput, Button } from 'react-native-paper' ;
import { View, StyleSheet } from 'react-native';
import axiosConfig from '../../axios-config';


const MFAVerificationScreen = ({ navigation, route }:
    {
        navigation: any,
        route: any
        }
) => {
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState(null);
  const email = route.params.email;
  

  const handleVerifyMfaCode = async() => {
    try {
      const apiUrl = '/auth/verify-mfa';
      const response = await axiosConfig.post(apiUrl, { mfaCode, email })
      console.log(response.data);
      await localStorage.setItem('token', response.data.token)
      navigation.navigate('Home');
    } catch (error: any) {
      setError(error.message);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MFA Verification</Text>
      <Text style={styles.message}>Enter the MFA code sent to your email ({email}):</Text>
      <TextInput
        style={styles.input}
        value={mfaCode}
        onChangeText={(text: any) => setMfaCode(text)}
        placeholder="MFA Code"
        keyboardType="numeric"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button  onPress={handleVerifyMfaCode} mode='contained' >
        Verify MFA Code
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default MFAVerificationScreen;