import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Title, HelperText } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import TagInput from "./TagInput";
import PasswordService from "../services/passwordservice";
import CommonService from "../services/CommonService";

interface PasswordFormProps {
  showModel: boolean;
  hideDialog: (updated?: boolean) => void;
  password?: {
    _id?: string;
    name: string;
    website: string;
    username: string;
    password: string;
    tags?: string[];
    description: string;
  };
}

const PasswordForm = ({ showModel, hideDialog, password }: PasswordFormProps) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      website: "",
      username: "",
      password: "",
      description: "",
    },
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);

  // Load form values when showModel or password changes
  useEffect(() => {
    if (showModel) {
      reset({
        name: password?.name || "",
        website: password?.website || "",
        username: password?.username || "",
        password: password?.password || "",
        description: password?.description || "",
      });
      setSelectedTags(password?.tags || []);
    }
  }, [showModel, password, reset]);

  // Fetch tags only once
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await CommonService.searchTags();
        setTags(res.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      if (password && password._id) {
        await PasswordService.updatePassword(password._id, { ...data, tags: selectedTags });
      } else {
        await PasswordService.addPassword({ ...data, tags: selectedTags });
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
            {errors.name.type === "required" ? "Name is required" : "Invalid name format"}
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
            {errors.website.type === "required" ? "Website is required" : "Invalid website format"}
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
        {/* <TagInput selectedTags={selectedTags} tags={tags} /> */}

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
    flex:1,
    width:"100%",
    backgroundColor:"white"
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  submitButton: {
    borderColor: "#007bff",
    borderRadius: 0,
  },
});

export default PasswordForm;
