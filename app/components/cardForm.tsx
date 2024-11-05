import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CardService from "../services/cardService";
import { Dropdown } from "react-native-element-dropdown";
import { Button, TextInput } from "react-native-paper";

const CardForm = ({ isSidebarOpen, setSidebarOpen, selectedCards }: any) => {
  const cardTypes = [
    { label: "Select Card Type", value: "" },
    { label: "Visa", value: "Visa" },
    { label: "MasterCard", value: "MasterCard" },
    { label: "American Express", value: "American Express" },
    { label: "Discover", value: "Discover" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      cardType: "",
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      CVV: "",
      billingAddress: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await CardService.createCard(data);
      console.log("Credit card created:", response);
      Alert.alert("Success", "Credit card saved successfully");
      reset();
      setSidebarOpen(false)
    } catch (error) {
      console.error("Failed to save credit card:", error);
      Alert.alert("Error", "Failed to save credit card");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Credit Card</Text>

      <View style={styles.formField}>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cardTypes}
          search
          labelField="label"
          valueField="value"
          placeholder={"Select country code"}
          searchPlaceholder="Search..."
          value={control._formValues.cardType}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={(e) => {
            control._formValues.cardType = e.value;
            console.log("fff", e);
          }}
        />

        {errors.cardType && (
          <Text style={styles.errorText}>Card Type is required.</Text>
        )}
      </View>

      <View style={styles.formField}>
        <Controller
          control={control}
          name="cardHolderName"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              style={styles.input}
              placeholder="Card Holder Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.cardHolderName && (
          <Text style={styles.errorText}>Card Holder Name is required.</Text>
        )}
      </View>

      <View style={styles.formField}>
        <Controller
          control={control}
          name="cardNumber"
          rules={{ required: true, pattern: /^[0-9]{16}$/ }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              style={styles.input}
              placeholder="Card Number"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.cardNumber && (
          <Text style={styles.errorText}>
            Enter a valid 16-digit card number.
          </Text>
        )}
      </View>

      <View style={styles.formField}>
        <Controller
          control={control}
          name="expiryDate"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              style={styles.input}
              placeholder="MM/YY"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.expiryDate && (
          <Text style={styles.errorText}>Expiry Date is required.</Text>
        )}
      </View>

      <View style={styles.formField}>
        <Controller
          control={control}
          name="CVV"
          rules={{ required: true, pattern: /^[0-9]{3,4}$/ }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.CVV && (
          <Text style={styles.errorText}>Enter a valid 3 or 4-digit CVV.</Text>
        )}
      </View>

      <View style={styles.formField}>
        <Controller
          control={control}
          name="billingAddress"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              style={styles.input}
              placeholder="Billing Address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={4}
            
            />
          )}
        />
        {errors.billingAddress && (
          <Text style={styles.errorText}>Billing Address is required.</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="contained"  buttonColor="gray" onPress={() => {
          setSidebarOpen(false);
        }} >
          <Text >cancel</Text>

        </Button>
        <Button mode="outlined" buttonColor="slate" onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </View>
    </View>
  );
};

export default CardForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  formField: {
    marginBottom: 12,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 16,
  },
  dropdown: {
    height: 50,
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
