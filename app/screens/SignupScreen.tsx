import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
  HelperText,
  Icon,
  Snackbar,
  TextInput,
  Button,
} from "react-native-paper";
import Stepper from "react-native-stepper-ui";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux"; // Import useDispatch
import { signup } from "@/app/store/actions/authAction"; // Adjust the import path as necessary
import { countries, countryCode } from "@/constants/country";
import { Dropdown } from "react-native-element-dropdown";
import axiosConfig from "@/axios-config";
import authService from "../services/authService";


const SignupScreen = ({ navigator }: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [filterStates, setFilterStates] = useState<any>([]);
  const [filterCities, setFilterCities] = useState<any>([]);
  const [signupError, setSignupError] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const dispatch = useDispatch<any>(); // Initialize dispatch

  const onSubmit = async (data: any) => {
    try {
      await dispatch(signup(data));
      setSnackbarVisible(true);
      setActiveStep(2);
    } catch (error) {
      setSignupError("Signup failed. Please try again."); // Handle error
      console.error(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const payload = {
        email: getValues().email.toString(),
        confirmationCode: otp.toString(),
      };
      const response = await authService.emailVerification(payload);
        setSnackbarVisible(true);
        setActiveStep(3);
       
      
      // navigator.navigate("home");
    } catch (error) {
      console.error(error);
      // navigator.navigate("home");
    }
  };
  const generatePrivateKey = async () => {
    try {
      const response = await authService.generatePrivateKey({
        email: getValues().email.toString(),
        passphrase: getValues().passphrase.toString(),
      });
      const privateKeyPEM = response.privateKeyPEM;

    // Share the private key using react-native-share
    const shareOptions = {
      title: 'Private Key',
      message: 'Here is your private key PEM:',
      url: `data:text/plain;base64,${Buffer.from(privateKeyPEM).toString('base64')}`,
      subject: 'Private Key PEM File',
    };

    // Open share dialog
    await Share.open(shareOptions);

    setActiveStep(4);

    } catch (error: any) {
      console.error(error);
    }
  };
  const steps: any = [
    // Step 1: Personal Information
    <View key="step1" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <ScrollView style={{ width: "100%" }}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Full Name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode="outlined"
            />
          )}
        />
        {errors.name && (
          <HelperText type="error" visible>
            {errors.name.message?.toString()}
          </HelperText>
        )}

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email Address"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode="outlined"
            />
          )}
        />
        {errors.email && (
          <HelperText type="error" visible>
            {errors.email.message?.toString()}
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
          placeholder={"Select country code"}
          searchPlaceholder="Search..."
          value={control._formValues.countryCode}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={(item: any) => {
            setValue("countryCode", item.value);
            console.log(control._formValues.countryCode);
          }}
        />
        <Controller
          control={control}
          name="phone"
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Phone Number"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          )}
        />
        {errors.phone && (
          <HelperText type="error" visible>
            {errors.phone.message?.toString()}
          </HelperText>
        )}

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              style={styles.input}
              mode="outlined"
            />
          )}
        />
        {errors.password && (
          <HelperText type="error" visible>
            {errors.password.message?.toString()}
          </HelperText>
        )}

        <Button mode="contained" onPress={() => setActiveStep(1)}>
          Next
        </Button>
      </ScrollView>
    </View>,

    // Step 2: Billing Information
    <View key="step2" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Contact Address</Text>

      <ScrollView
        style={{
          gap: 20,
        }}
      >
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
          placeholder={"Select country"}
          value={control._formValues.country}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={(item: any) => {
            setValue("country", item.value);
            const state = item.states.map((state: any) => {
              if (state?.value && state?.label) {
                return {
                  value: state.value,
                  label: state.label,
                  cities: state.cities,
                };
              } else if (state.state) {
                return {
                  value: state.state,
                  label: state.state,
                  cities: state.cities,
                };
              }
            });
            setFilterStates(state);

            console.log(
              "control._formValues.country",
              control._formValues.country
            );
          }}
        />
      </ScrollView>
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
        placeholder={"Select state"}
        value={control._formValues.state}
        onFocus={() => {}}
        onBlur={() => {}}
        onChange={(item: any) => {
          const cities = item.cities.map((city: any) => {
            if (city.label && city.value) {
              return {
                value: city.value,
                label: city.label,
              };
            } else {
              return {
                value: city,
                label: city,
              };
            }
          });
          setValue("state", item.value);
          setFilterCities(cities);
        }}
      />
      <ScrollView style={{ width: "100%" }}>
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
          placeholder={"Select city"}
          value={control._formValues.country}
          searchPlaceholder="Search..."
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={(item: any) => {
            setValue("city", item.value);
            console.log(control._formValues);
          }}
        />
      </ScrollView>
      <ScrollView style={{ width: "100%" }}>
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
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          )}
        />
        {errors.address && (
          <HelperText type="error" visible>
            Billing address is required
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
              mode="outlined"
            />
          )}
        />
        {errors.postalCode && (
          <HelperText type="error" visible>
            Postal Code is required
          </HelperText>
        )}

        {/* Add fields for State, City, Address, Postal Code */}

        <Button mode="contained" onPress={() => handleSubmit(onSubmit)()}>
          Create account
        </Button>
      </ScrollView>
    </View>,

    // Step 3: OTP Verification
    <View key="step3" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Email Verification</Text>
      <ScrollView style={{ width: "100%" }}>
        <Controller
          control={control}
          name="otp"
          rules={{ required: "OTP is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Enter OTP"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
          )}
        />
        {errors.otp && (
          <HelperText type="error" visible>
            {errors.otp.message?.toString()}
          </HelperText>
        )}

        <Button mode="contained" onPress={verifyOTP}>
          Verify Email
        </Button>
      </ScrollView>
    </View>,

    // Step 4: Passphrase Setup
    <View key="step4" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Passphrase Setup</Text>
      <ScrollView style={{ width: "100%" }}>
        <Controller
          control={control}
          name="passphrase"
          rules={{
            required: "Passphrase is required",
            minLength: {
              value: 8,
              message: "Passphrase must be at least 8 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Passphrase"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              style={styles.input}
              mode="outlined"
            />
          )}
        />
        {errors.passphrase && (
          <HelperText type="error" visible>
            {errors.passphrase.message?.toString()}
          </HelperText>
        )}

        <Button mode="contained" onPress={generatePrivateKey}>
          Add recovery passphrase
        </Button>
      </ScrollView>
    </View>,

    // Step 5: Security Questions
    <View key="step5" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Security Questions</Text>
      <ScrollView style={{ width: "100%" }}>
        <Controller
          control={control}
          name="securityQuestion1"
          rules={{ required: "Security Question 1 is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Security Question 1"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode="outlined"
            />
          )}
        />
        {errors.securityQuestion1 && (
          <HelperText type="error" visible>
            {errors.securityQuestion1.message?.toString()}
          </HelperText>
        )}

        <Controller
          control={control}
          name="securityAnswer1"
          rules={{ required: "Answer is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Answer"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
              mode="outlined"
            />
          )}
        />
        {errors.securityAnswer1 && (
          <HelperText type="error" visible>
            {errors.securityAnswer1.message?.toString()}
          </HelperText>
        )}

        <Button mode="contained" onPress={() => handleSubmit(onSubmit)}>
          Submit
        </Button>
      </ScrollView>
    </View>,
  ];

  const onBackStep = () => {
    console.log("active", activeStep);
  };

  const onNextStep = () => {
    console.log("activeStep", activeStep);
    console.log("steps", steps.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Your Password Journey</Text>
      <Stepper
        active={activeStep}
        content={steps}
        showButton={false}
        onNext={onNextStep}
        onBack={onBackStep}
        onFinish={verifyOTP}
        stepStyle={{
          display: "flex",
          flexDirection: "column",
        }}
        buttonStyle={{
          width: "50%",
          height: 50,
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Close",
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
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  stepContainer: {
    padding: 20,
    gap: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 0,
  },
  dropdown: {
    height: 50,
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: "gray",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "gray",
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
