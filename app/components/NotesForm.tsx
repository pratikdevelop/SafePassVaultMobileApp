import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, TextInput, Button, Dialog, Portal } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

interface FormValues {
  title: string;
  content: string;
}

const NotesForm = ({ visible, onDismiss, onSubmit }: { visible: boolean, onDismiss: () => void, onSubmit: (data: FormValues) => void }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

  return (
    <Portal>
      <Dialog visible={visible} style={{
       
      }} onDismiss={onDismiss}>
        {/* Dialog Header */}

            <Dialog.Title style={{
            }}>
                <View>
                    <Text style={{
                        fontSize: 16,
                        color: '#333',
                        fontWeight: 'bold',
                        }}>
                            Add Note
                        </Text>
                </View>
            </Dialog.Title>

        {/* Dialog Content */}
        <Dialog.Content>
          <View style={styles.formContainer}>
            {/* Title Input */}
            <Controller
              control={control}
              name="title"
              rules={{ required: 'Title is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Title"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.title}
                />
              )}
            />
            {errors.title && <View style={styles.errorText}>{errors.title.message}</View>}

            {/* Content Input */}
            <Controller
              control={control}
              name="content"
              rules={{ required: 'Content is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Content"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  error={!!errors.content}
                />
              )}
            />
            {errors.content && <View style={styles.errorText}>{errors.content.message}</View>}
          </View>
        </Dialog.Content>

        {/* Dialog Actions */}
        <Dialog.Actions style={styles.actions}>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button mode="contained" style={{
            paddingHorizontal:10,
            elevation: 0,
            borderRadius:0
          }} onPress={handleSubmit(onSubmit)}>Save Note</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#6200ee',
  },
  formContainer: {
    marginTop: 20,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default NotesForm;
