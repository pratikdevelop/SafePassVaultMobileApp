import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { HelperText, Snackbar, TextInput } from 'react-native-paper';
import Stepper from 'react-native-stepper-ui';
import { Controller, useForm } from 'react-hook-form';
import axiosConfig from '../../axios-config';

const SignupScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
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

  const steps = [
    <View key="step1" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <ScrollView>
        <Controller
          control={control}
          name="name"
          rules={{ required: true, minLength: 3 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Your Name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode="flat"
            />
          )}
        />
        {errors.name && (
          <HelperText type="error" visible>
            {errors.name.type === 'required'
              ? 'Name is required'
              : 'Name must be at least 3 characters'}
          </HelperText>
        )}

        <Controller
          control={control}
          name="email"
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Your Email"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode="flat"
            />
          )}
        />
        {errors.email && (
          <HelperText type="error" visible>
            {errors.email.type === 'required'
              ? 'Email is required'
              : 'Please enter a valid email address'}
          </HelperText>
        )}

        <Controller
          control={control}
          name="phone"
          rules={{
            required: true,
            minLength: 10,
            maxLength: 10,
            pattern: /^[0-9]+$/,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Your Phone"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="numeric"
              style={styles.input}
              mode="flat"
            />
          )}
        />
        {errors.phone && (
          <HelperText type="error" visible>
            {errors.phone.type === 'required'
              ? 'Phone number is required'
              : 'Please enter a valid 10-digit phone number'}
          </HelperText>
        )}

        <Controller
          control={control}
          name="password"
          rules={{ required: true, minLength: 6 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Your Password"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              style={styles.input}
              mode="flat"
            />
          )}
        />
        {errors.password && (
          <HelperText type="error" visible>
            {errors.password.type === 'required'
              ? 'Password is required'
              : 'Password must be at least 6 characters'}
          </HelperText>
        )}
      </ScrollView>
    </View>,

    <View key="step2" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Billing Information</Text>
      <ScrollView>
        <Controller
          control={control}
          name="billingAddress"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Billing Address"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode="flat"
            />
          )}
        />
        {errors.billingAddress && (
          <HelperText type="error" visible>
            Billing address is required
          </HelperText>
        )}

        <Controller
          control={control}
          name="city"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="City"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode="flat"
            />
          )}
        />
        {errors.city && (
          <HelperText type="error" visible>
            City is required
          </HelperText>
        )}

        <Controller
          control={control}
          name="state"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="State/Province"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode="flat"
            />
          )}
        />
        {errors.state && (
          <HelperText type="error" visible>
            State/Province is required
          </HelperText>
        )}

        <Controller
          control={control}
          name="postalCode"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Postal Code"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode="flat"
            />
          )}
        />
        {errors.postalCode && (
          <HelperText type="error" visible>
            Postal Code is required
          </HelperText>
        )}

        <Controller
          control={control}
          name="country"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Country"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode="flat"
            />
          )}
        />
        {errors.country && (
          <HelperText type="error" visible>
            Country is required
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
      console.log(data);
      await axiosConfig.post('/auth/register', data);
      setSnackbarVisible(true);
      reset();
    } catch (error) {
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
        onBack={onBackStep}
        onFinish={handleSubmit(onSubmit)}
      />

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
