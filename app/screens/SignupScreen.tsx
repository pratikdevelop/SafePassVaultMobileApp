import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { HelperText, Icon, Snackbar, TextInput } from 'react-native-paper';
import Stepper from 'react-native-stepper-ui';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { signup } from '@/app/store/actions/authAction'; // Adjust the import path as necessary
import { countries, countryCode } from '@/constants/country';
import { Dropdown } from 'react-native-element-dropdown';
import axiosConfig from '@/axios-config';
import authService from '../services/authService';

const SignupScreen = ({navigator}: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [filterStates, setFilterStates] = useState<any>([]);
  const [filterCities, setFilterCities] = useState<any>([]);
  const [signupError, setSignupError] = useState('');
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      countryCode:"",
      address: '',
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
              mode='outlined'
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
              mode='outlined'
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

        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={countryCode}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={ 'Select country code'}
          searchPlaceholder="Search..."
          value={control._formValues.countryCode}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={(item:any) => {
            setValue('countryCode',item.value)
            console.log(control._formValues.countryCode)          
          }}
        />
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
              mode='outlined'
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
              mode='outlined'
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
      <Text style={styles.stepTitle}>Contact Address</Text>

      <ScrollView style={{
        gap:20
      }}>
      <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={countries}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={ 'Select country'}
          value={control._formValues.country}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={(item:any) => {
            setValue('country', item.value)
            const state = item.states.map((state: any)=>{
                if (state?.value && state?.label) {
                  return {
                    value: state.value,
                    label: state.label,
                    cities: state.cities
                  }
                }else if (state.state){
                  return {
                    value: state.state,
                    label: state.state,
                    cities: state.cities
                  }
                }
            })
            setFilterStates(state);
            
            console.log('control._formValues.country', control._formValues.country)          
          }}
        />
         <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={filterStates}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={ 'Select state'}
          value={control._formValues.state}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={(item:any) => {
            const cities = item.cities.map((city: any)=>{
                if(city.label && city.value) {
                  return {
                    value: city.value,
                    label: city.label
                  }
                }else {
                  return {
                    value: city,
                    label: city
                  }
                }
            })
              setValue('state', item.value);
              setFilterCities(cities);   
              console.log('dd', filterCities);
              console.log('ff', control._formValues)
               
          }}
        />
      <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={filterCities}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={ 'Select city'}
          value={control._formValues.country}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={(item:any) => {
            setValue('city', item.value)   
            console.log(control._formValues);
                           
          }}
        />
        <Controller
          control={control}
          name="address"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Street Address"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode='outlined'
            />
          )}
        />
        {errors.address && (
          <HelperText type="error" visible>
            Billing address is required
          </HelperText>
        )}
        {/* <Controller
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
              mode='outlined'
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
              mode='outlined'
            />
          )}
        />
        {errors.state && (
          <HelperText type="error" visible>
            State/Province is required
          </HelperText> */}
        {/* )} */}
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
              mode='outlined'
            />
          )}
        />
        {errors.postalCode && (
          <HelperText type="error" visible>
            Postal Code is required
          </HelperText>
        )}

        {/* <Controller
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
              mode='outlined'
            />
          )}
        />
        {errors.country && (
          <HelperText type="error" visible>
            Country is required
          </HelperText>
        )} */}
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
    console.log('active', activeStep);
    
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const onNextStep = () => {
    console.log('activeStep', activeStep);
    console.log('steps',steps.length );
    
    if (activeStep === 1) {
      handleSubmit(onSubmit)(); // Submit data on final step

    } else {
      setActiveStep(activeStep + 1);

    }

  };

  const onSubmit = async (data: any) => {
    try {
      console.log('submit call');
      
      await dispatch(signup(data));
      setSnackbarVisible(true);
      setActiveStep(2);
    } catch (error) {
      setSignupError('Signup failed. Please try again.'); // Handle error
      console.error(error);
    }
  };

  const verifyOTP = async()=>{
    try {
      const payload = {
        email: getValues().email.toString(),
        confirmationCode: otp.toString()
      };
      const response = await authService.emailVerification(payload);
      navigator.navigate('home')
    } catch (error) {
      console.error(error);
      navigator.navigate('home')

    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Your Password Journey</Text>
      <Stepper
        active={activeStep}
        content={steps}
        onNext={onNextStep}
        onBack={onBackStep} onFinish={verifyOTP}
        stepStyle={{
          display:"flex",
          flexDirection:"column",
        }}
        buttonStyle={
          {
            width:"50%",
            height:50,
            backgroundColor:"blue",
            justifyContent:"center",
            alignItems:"center",
            display:"flex",
            flexDirection:"column"
          }
        }
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
    gap:20
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
      marginBottom: 20,
      backgroundColor:"white",
      borderRadius: 0,
  },
  dropdown: {
    height: 50,
    marginBottom:20,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color:"gray"
  },
  placeholderStyle: {
    fontSize: 16,
    color:"gray"

  },
  selectedTextStyle: {
    fontSize: 16,
    color:"gray"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default SignupScreen;