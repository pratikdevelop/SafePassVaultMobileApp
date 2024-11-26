import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Title, HelperText } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import PasswordService from "../services/passwordservice";
import FolderComponent from "./FolderComponent";
import TagComponent from "./TagComponent";

interface PasswordFormProps {
  showModel: boolean;
  hideDialog: (updated?: boolean) => void;
  password: {
    _id?: string;
    name: string;
    website: string;
    username: string;
    password: string;
    tags: any[];
    description: string;
    folder: any;
  };
  tags: any[];
  token: string;
}
const PasswordForm = ({
  showModel,
  hideDialog,
  password,
  tags,
  token,
}: PasswordFormProps) => {
  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      website: "",
      username: "",
      password: "",
      description: "",
      folderId: "",
      tags: [],
    },
  });
  useEffect(() => {
    if (showModel) {
      reset({
        name: password?.name || "slack",
        website: password?.website || "https://slack.com",
        username: password?.username || "test@yopmail.com",
        password: password?.password || "Access@#$1234",
        description: password?.description || "g5454354",
        tags: password?.tags || [],
        folderId: password?.folder?._id || "",
      });
    }
  }, [showModel, password, reset]);

  const onSubmit = async (data: any) => {
    try {
      if (password && password._id) {
        await PasswordService.updatePassword(password._id, data, token);
      } else {
        await PasswordService.addPassword(data, token);
      }
      hideDialog(true);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>
        {password ? "Edit Password" : "Add Password"}
      </Title>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        {/* Name Input */}
        <Controller
          control={control}
          name="name"
          rules={{ required: true, pattern: /^[A-Za-z0-9 ]+$/ }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Enter name"
              value={value || ""}
              onChangeText={onChange}
              mode="outlined"
              style={styles.input}
            />
          )}
        />
        {errors.name && (
          <HelperText type="error">
            {errors.name.type === "required"
              ? "Name is required"
              : "Invalid name format"}
          </HelperText>
        )}

        {/* Website Input */}
        <Controller
          control={control}
          name="website"
          rules={{ required: true, pattern: /https?:\/\/[^\s/$.?#].[^\s]*/ }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="https://example.com"
              value={value || ""}
              onChangeText={onChange}
              mode="outlined"
              keyboardType="url"
              style={styles.input}
            />
          )}
        />
        {errors.website && (
          <HelperText type="error">
            {errors.website.type === "required"
              ? "Website is required"
              : "Invalid website format"}
          </HelperText>
        )}

        {/* Username Input */}
        <Controller
          control={control}
          name="username"
          rules={{
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="username@example.com"
              value={value || ""}
              onChangeText={onChange}
              mode="outlined"
              keyboardType="email-address"
              style={styles.input}
            />
          )}
        />
        {errors.username && (
          <HelperText type="error">
            {errors.username.type === "required"
              ? "Username is required"
              : "Invalid email format"}
          </HelperText>
        )}

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          rules={{ required: true, minLength: 8 }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Enter password"
              value={value || ""}
              onChangeText={onChange}
              mode="outlined"
              secureTextEntry
              style={styles.input}
            />
          )}
        />
        {errors.password && (
          <HelperText type="error">
            {errors.password.type === "required"
              ? "Password is required"
              : "Password must be at least 8 characters long"}
          </HelperText>
        )}

        {/* Description Input */}
        <Controller
          control={control}
          name="description"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Enter description"
              value={value || ""}
              onChangeText={onChange}
              mode="outlined"
              multiline
              style={styles.input}
            />
          )}
        />
        {errors.description && (
          <HelperText type="error">Description is required</HelperText>
        )}

        {/* Tag Input Component */}
        <TagComponent
          control={control}
          tags={tags}
          setValue={setValue}
        ></TagComponent>
        <FolderComponent
          type={"passwords"}
          setValue={setValue}
          control={control}
        />

        {/* Actions */}
        <View style={styles.actions}>
          <Button mode="text" onPress={() => hideDialog(false)}>
            Cancel
          </Button>
          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            {password ? "Update Password" : "Add Password"}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  actions: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  submitButton: {
    borderColor: "#007bff",
    borderRadius: 0,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  chip: {
    margin: 4,
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

export default PasswordForm;
