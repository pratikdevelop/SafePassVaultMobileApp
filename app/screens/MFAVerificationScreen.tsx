import React, { useState } from 'react';
import { Text, TextInput, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import axiosConfig from '../../axios-config';

const MFAVerificationScreen = ({ navigation, route }:
    {
        navigation: any,
        route: any
    }
) => {
    const [mfaCode, setMfaCode] = useState('');
    const [securityPin, setSecurityPin] = useState('');
    const [error, setError] = useState(null);
    const email = route.params.email;
    const mfaMethod = route.params.mfaMethod; // Get the MFA method from route params

    console.log('Email from MFA verification screen: ', email);
    console.log('MFA Method: ', mfaMethod);

    const handleVerifyMfaCode = async () => {
        try {
            const apiUrl = '/auth/verify-mfa';
            const response = await axiosConfig.post(apiUrl, { mfaCode, email });
            await localStorage.setItem('token', response.data.token);
            navigation.navigate('Home');
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleVerifySecurityPin = async () => {
        try {
            const apiUrl = '/auth/verify-security-pin'; // Adjust the API endpoint as needed
            const response = await axiosConfig.post(apiUrl, { securityPin, email });
            await localStorage.setItem('token', response.data.token);
            navigation.navigate('Home');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MFA Verification</Text>
            {mfaMethod === 'webauthn' ? (
                <>
                    <Text style={styles.message}>Enter your Security PIN:</Text>
                    <TextInput
                        style={styles.input}
                        value={securityPin}
                        onChangeText={(text) => setSecurityPin(text)}
                        placeholder="Security PIN"
                        keyboardType="numeric"
                        secureTextEntry={true} // Hide the PIN input
                    />
                </>
            ) : (
                <>
                    <Text style={styles.message}>Enter the MFA code sent to your email ({email}):</Text>
                    <TextInput
                        style={styles.input}
                        value={mfaCode}
                        onChangeText={(text) => setMfaCode(text)}
                        placeholder="MFA Code"
                        keyboardType="numeric"
                    />
                </>
            )}
            {error && <Text style={styles.error}>{error}</Text>}
            <Button
                onPress={mfaMethod === 'webauthn' ? handleVerifySecurityPin : handleVerifyMfaCode}
                mode='contained'
                style={{
                  backgroundColor: 'blue',
                  width: '100%',
                  borderRadius:0,
                  paddingVertical: 5,
                }}
                textColor='white'
            >
                Verify Security pin 
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
        fontSize: 48,
        color:"blak",
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color:"gray",
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