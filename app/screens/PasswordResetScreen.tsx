

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextInput } from "react-native-paper";
import { loginUser } from "../store/actions/authAction"; // Adjust the import based on your structure
import store from "../store/store";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
});

const PasswordResetScreen = ({ navigation }: { navigation: any }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSubmitting, setIssubmitting] = useState(false);

  const formValue = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: "",
    },
  });


  const onSubmit = async (data: any) => {
    setIssubmitting(true);
    try {
      const res: any = await store.dispatch(
        loginUser(data.username, data.password)
      );

      if (res.mfaRequired) {
        navigation.navigate("MFAVerification", {
          mfaMethod: res.mfaMethod,
          email: data.username,
        });
      } else if (res.success) {
        navigation.navigate("Home");
      } else {
        setSnackbarMessage(res?.message);
        setSnackbarVisible(true);
      }
      setIssubmitting(false)
    } catch (error) {
      console.error("Login error:", error);
      setSnackbarMessage("Login failed. Please try again.");
      setSnackbarVisible(true);
      setIssubmitting(false)
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {snackbarVisible ? (
          <Text style={styles.title}>{snackbarMessage}</Text>
        ) : null}
        <Text style={styles.title}>Login with your account</Text>
        <Controller
          control={formValue.control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter your username"
              onChangeText={onChange}
              textColor={formValue.formState.errors.username ? "error" : "primary"}
              onBlur={onBlur}
              value={value}
              inputMode="email"
              style={{
                marginBottom: 20,
                borderRadius: 20,
                borderWidth: 0, // Remove border width
              }}

            />
          )}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={styles.linkContainer}
          >
            <Text style={styles.link}> Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.link}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          aria-disabled = {!formValue.formState.isValid}
          onPress={formValue.handleSubmit(onSubmit)}
          disabled={isSubmitting || !!Object.keys(formValue.formState.errors).length}
        >
          {isSubmitting ? "Loading..." : "Login"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  formContainer: {
    margin: 16,
    display: "flex",
    flexDirection: "column",
    columnGap: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginVertical: 30,
    textAlign: "center",
    fontFamily: "cursive",
  },
  linkContainer: {
    marginVertical: 12,
  },
  link: {
    color: "#007bff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default PasswordResetScreen;
