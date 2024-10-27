import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Modal,
  Portal,
  TextInput,
  Button,
  Title,
  HelperText,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import TagInput from "./TagInput";
import PasswordService from "../services/passwordservice";
import CommonService from "../services/CommonService";
import { ScrollView } from "react-native-gesture-handler";

const PasswordForm = ({ visible, onDismiss, password }: any) => {
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState<any>([])
  useEffect(() => {
    // Reset form and clear selected tags
    reset();
    setSelectedTags([]);
  
    // If password is available, set form values
    if (password) {
      setValue('name', password.name);
      setValue('website', password.website);
      setValue('username', password.username);
      setValue('password', password.password);
      setSelectedTags(password.tags);
      setValue('description', password.description);
    }

    fetchTags();
  }, [visible]); // Add password to the dependency array if it can change
  
  // Fetch tags from the server
  const fetchTags = async () => {
    try {
      const res = await CommonService.searchTags();
      console.log('Tags fetched:', res.tags); // Log the response to see the structure
      setTags(res.tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };
  const onSubmit = async (data: any) => {
    try {
      const response = password._id ?  
      await PasswordService.updatePassword(password._id, data) :await PasswordService.addPassword(data);
      onDismiss(true);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        style={{ backgroundColor: "white" }}
      >
        <View style={styles.container}>
          <Title>Add Password</Title>
    <ScrollView>

            <Controller
              control={control}
              name="name"
              rules={{ required: true, pattern: /^[A-Za-z0-9 ]+$/ }} // Adjust pattern as needed
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Enter name"
                  value={value}
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

            <Controller
              control={control}
              name="website"
              rules={{
                required: true,
                pattern: /https?:\/\/[^\s/$.?#].[^\s]*/,
              }} // Adjust pattern as needed
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="https://example.com"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
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

            <Controller
              control={control}
              name="username"
              rules={{
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              }} // Adjust pattern as needed
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="username@example.com"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
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

            <Controller
              control={control}
              name="password"
              rules={{ required: true, minLength: 8 }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Enter password"
                  value={value}
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

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Enter description"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
                  style={styles.input}
                  multiline
                />
              )}
            />
            {errors.description && (
              <HelperText type="error">Description is required</HelperText>
            )}
            <TagInput selectedTags={selectedTags} tags={tags} />
          <View style={styles.actions}>
            <Button mode="text" onPress={onDismiss}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              Add Password
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
  form: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default PasswordForm;
