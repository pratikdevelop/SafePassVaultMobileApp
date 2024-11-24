import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

const EditProfileModal = ({ visible, onClose, userData, onSave }: any) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    billingAddress: userData?.billingAddress || '',
    country: userData?.country || '',
    state: userData?.state || '',
    city: userData?.city || '',
    postalCode: userData?.postalCode || '',
  });
  useEffect(() => {
    setIsVisible(visible);
    console.log("editModalVisible updated:", isVisible);
  }, [visible]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.email || !form.country || !form.state || !form.city) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onClose}>
        <Dialog.Title>Profile</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.subtitle}>
            Manage your name, password, and account settings.
          </Text>
          <ScrollView>
            {/* Full Name */}
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={form.name}
              onChangeText={(value) => handleChange('name', value)}
            />
            {/* Email */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={form.email}
              keyboardType="email-address"
              onChangeText={(value) => handleChange('email', value)}
            />
            {/* Phone */}
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={form.phone}
              keyboardType="phone-pad"
              onChangeText={(value) => handleChange('phone', value)}
            />
            {/* Billing Address */}
            <TextInput
              style={styles.input}
              placeholder="Billing Address"
              value={form.billingAddress}
              onChangeText={(value) => handleChange('billingAddress', value)}
            />
            {/* Country */}
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={form.country}
              onChangeText={(value) => handleChange('country', value)}
            />
            {/* State */}
            <TextInput
              style={styles.input}
              placeholder="State"
              value={form.state}
              onChangeText={(value) => handleChange('state', value)}
            />
            {/* City */}
            <TextInput
              style={styles.input}
              placeholder="City"
              value={form.city}
              onChangeText={(value) => handleChange('city', value)}
            />
            {/* Postal Code */}
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={form.postalCode}
              keyboardType="numeric"
              onChangeText={(value) => handleChange('postalCode', value)}
            />
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button onPress={handleSave}>Save changes</Button>
        </Dialog.Actions>
      </Dialog>

    </Portal>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
});
