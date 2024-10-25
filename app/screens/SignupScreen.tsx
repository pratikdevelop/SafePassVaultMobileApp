import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { HelperText, Snackbar, TextInput } from 'react-native-paper';
import Stepper from 'react-native-stepper-ui';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { signup } from '@/app/store/actions/authAction'; // Adjust the import path as necessary

const SignupScreen = ({navigator}: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [signupError, setSignupError] = useState('');
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      billingAddress: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  });
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const dispatch = useDispatch<any>(); // Initialize dispatch

  const steps = [
    <View key="step1" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <ScrollView>
        {/* ... other inputs as before ... */}
      </ScrollView>
    </View>,

    <View key="step2" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Billing Information</Text>
      <ScrollView>
        {/* ... other inputs as before ... */}
      </ScrollView>
    </View>,

    <View key="step3" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Email Verification</Text>
      <ScrollView>
        <TextInput
          label="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />
        {otpError && (
          <HelperText type="error" visible>
            {otpError}
          </HelperText>
        )}
      </ScrollView>
    </View>,
  ];

  const onBackStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const onNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      handleSubmit(onSubmit)(); // Submit data on final step
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await dispatch(signup(data));
      setSnackbarVisible(true);
      reset();
    } catch (error) {
      setSignupError('Signup failed. Please try again.'); // Handle error
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Your Password Journey</Text>
      <Stepper
        active={activeStep}
        content={steps}
        onNext={onNextStep}
        onBack={onBackStep} onFinish={()=>{
          console.log('Finish');
          navigator
        }}      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Close',
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        Signup successful!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
});

export default SignupScreen;
