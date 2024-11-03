import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Modal,
  TextInput,
  Button,
  Title,
  HelperText,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import TagInput from "./TagInput";
import PasswordService from "../services/passwordservice";
import CommonService from "../services/CommonService";

interface PasswordFormProps {
  visible: boolean;
  onDismiss: (updated?: boolean) => void;
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

const PasswordForm: React.FC<PasswordFormProps> = ({ visible, onDismiss, password }) => {
  const { control, setValue, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      website: '',
      username: '',
      password: '',
      description: '',
    },
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (visible) {
      // Reset form to initial values or password data if available
      reset({
        name: password?.name || '',
        website: password?.website || '',
        username: password?.username || '',
        password: password?.password || '',
        description: password?.description || '',
      });
      // setSelectedTags(password?.tags || []);
    }
    // fetchTags();
  }, [visible, password]);

  const fetchTags = async () => {
    try {
      const res = await CommonService.searchTags();
      setTags(res.tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const response = password && password._id
        ? await PasswordService.updatePassword(password._id, data)
        : await PasswordService.addPassword(data);
      onDismiss(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal visible={visible} onDismiss={() => onDismiss(false)} style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Title>{password ? "Edit Password" : "Add Password"}</Title>
        <ScrollView style={{ paddingHorizontal: 16 }} keyboardShouldPersistTaps="handled">
          
          {/* Name Input */}
          <Controller
            control={control}
            name="name"
            rules={{ required: true, pattern: /^[A-Za-z0-9 ]+$/ }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Enter name"
                value={value || ''}
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
                value={value || ''}
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
                value={value || ''}
                onChangeText={onChange}
                mode="outlined"
                keyboardType="email-address"
                style={styles.input}
              />
            )}
          />
          {errors.username && (
            <HelperText type="error">
              {errors.username.type === "required" ? "Username is required" : "Invalid email format"}
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
                value={value || ''}
                onChangeText={onChange}
                mode="outlined"
                secureTextEntry
                style={styles.input}
              />
            )}
          />
          {errors.password && (
            <HelperText type="error">
              {errors.password.type === "required" ? "Password is required" : "Password must be at least 8 characters long"}
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
                value={value || ''}
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
          <TagInput selectedTags={selectedTags} tags={tags} />

          {/* Actions */}
          <View style={styles.actions}>
            <Button mode="text" onPress={() => onDismiss(false)}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              {password ? "Update Password" : "Add Password"}
            </Button>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );  
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default PasswordForm;
