import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { Appbar, Button } from "react-native-paper";
import EditProfileModal from "../components/editprofilemodal";

const PersonalDetailsScreen = () => {
  let show = false;
  const [editModalVisible, setEditModalVisible] = useState<any>(false);
  const [user, setUser] = useState({
    name: "John Doe",
    role: "admin",
    email: "john.doe@example.com",
    phone: "1234567890",
    createdAt: "2023-04-01T12:34:56",
    billingAddress: "123 Main Street",
    city: "San Francisco",
    state: "California",
    postalCode: "94101",
    country: "USA",
    organization: [{ name: "Tech Corp" }],
    userImage: null,
    mfaEnabled: true,
  });

  const [plan, setPlan] = useState({ plan: "Free" });

  // Function to handle file selection using ImagePicker
  const onFileSelected = async () => {
    try {
      // const result: any = await ImagePicker.launchImageLibraryAsync({
      //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      //   quality: 1,
      // });
      // console.log("ff", result);

      // if (!result.canceled) {
      //   setUser({ ...user, userImage: result.assets });
      // }
    } catch (error) {
      console.error("File selection error:", error);
      Alert.alert("Error", "Could not select image.");
    }
  };

  // Function to handle editing profile
  const editProfile = () => {
    show = true
    console.log('fff', show);
    
  };


  const handleSaveProfile = () => {
    Alert.alert("Profile Updated", "Your changes have been saved.");
  };

  const handleCancelEdit = () => {};

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header
        style={{
          backgroundColor: "#fff",
          borderColor: "lightgray",
          shadowColor: "lightgray",
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          elevation: 0,
        }}
      >
        <Appbar.Content title="Personal Information" />
        <Button mode="contained" onPress={editProfile}>
          <Text>Edit Profile</Text>
        </Button>
      </Appbar.Header>
      {/* Profile Info */}
      <View style={styles.profileContainer}>
        {/* Left Section */}
        <View style={styles.imageSection}>
          <Image
            source={{
              uri: user.userImage || "https://placehold.co/150",
            }}
            style={styles.profileImage}
          />
          <Button mode="contained" onPress={onFileSelected}>
            <Text style={styles.uploadText}>Upload Photo</Text>
          </Button>
        </View>

        {/* Right Section */}
        <View style={styles.infoSection}>
          <Text style={styles.name}>Welcome {user.name}</Text>
          <View style={styles.infoGrid}>
            <DetailItem label="Role" value={user.role} />
            <DetailItem label="Email" value={user.email} />
            <DetailItem label="Phone" value={`+${user.phone}`} />
            <DetailItem
              label="Created at"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
            <DetailItem
              label="Address"
              value={`${user.billingAddress}, ${user.city}`}
            />
            <DetailItem label="City" value={user.city} />
            <DetailItem label="State" value={user.state} />
            <DetailItem label="Postal Code" value={user.postalCode} />
            <DetailItem label="Country" value={user.country} />
            <DetailItem
              label="Organization"
              value={user.organization[0]?.name}
            />
            <DetailItem label="Plan" value={plan.plan} />
            <DetailItem
              label="MFA Status"
              value={user.mfaEnabled ? "Enabled" : "Disabled"}
            />
          </View>
        </View>
          <EditProfileModal
            visible={show}
            onClose={() => setEditModalVisible(false)}
          />
      </View>
    </ScrollView>
  );
};

// Reusable Detail Item Component
const DetailItem = ({ label, value }: any) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  profileContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    padding: 16,
    backgroundColor: "#FFF",
    margin: 16,
    borderRadius: 10,
  },
  infoSection: {
    flex: 2,
    paddingRight: 16,
    marginTop: "8rem",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Fantasy",
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detailItem: {
    flexDirection: "row",
    width: "50%",
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: "bold",
    fontFamily: "Fantasy",
  },
  detailValue: {
    marginLeft: 4,
    fontFamily: "Fantasy",
    color: "#64748B",
  },
  imageSection: {
    flex: 1,
    alignItems: "center",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    borderWidth: 4,
    borderColor: "#38BDF8",
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: "",
    padding: 8,
    borderRadius: 5,
  },
  uploadText: {
    fontSize: 14,
    fontFamily: "Fantasy",
  },
});

export default PersonalDetailsScreen;
