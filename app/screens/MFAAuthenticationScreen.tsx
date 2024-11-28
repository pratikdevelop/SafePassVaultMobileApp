import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  GestureResponderEvent,
} from "react-native";
import { Appbar, Button } from "react-native-paper";
import EditProfileModal from "../components/editprofilemodal";
import authService from "../services/authService"; // Import the auth service

const MFAAuthenticationScreen = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [plan, setPlan] = useState<any>({
    name: "",
    price: "",
  });
  const userDetails = [
    { label: "Role", value: userInfo?.role || "N/A" },
    { label: "Email", value: userInfo?.email || "N/A" },
    { label: "Phone", value: `+${userInfo?.phone || "N/A"}` },
    { label: "Created at", value: userInfo?.createdAt || "N/A" },
    {
      label: "Address",
      value: userInfo?.billingAddress
        ? `${userInfo.billingAddress}, ${userInfo?.city || ""}`
        : "N/A",
    },
    { label: "City", value: userInfo?.city || "N/A" },
    { label: "State", value: userInfo?.state || "N/A" },
    { label: "Postal Code", value: userInfo?.postalCode || "N/A" },
    { label: "Country", value: userInfo?.country || "N/A" },
    {
      label: "Organization",
      value:
        userInfo?.organization?.length > 0
          ? userInfo?.organization[0]?.name
          : "N/A",
    },
    { label: "Plan", value: plan?.name || "N/A" },
    {
      label: "MFA Status",
      value: userInfo?.mfaEnabled ? "Enabled" : "Disabled",
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setUserInfo(authService.userProfile);
    console.log("User Profile", authService.userProfile);

    if (authService.userProfile) {
      Object.keys(authService.userProfile).forEach((keys: string) => {
        userDetails.forEach((user) => {
          if (keys === user.label.toLowerCase().replace(" ", "")) {
            user.value = authService.userProfile[keys];
          }
        });
      });
    }
    console.log("userDetails", userDetails);

    setLoading(false);
  }, [authService.userProfile]);

  // Open edit profile modal
  const editProfile = () => {
    setEditModalVisible(true);
  };

  function onFileSelected(e: any): void {
    const file = e.nativeEvent;
    console.log("file", file);
  }

  // Prepare the list of details to display

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header
        style={{
          backgroundColor: "#fff",
          elevation: 0,
        }}
      >
        <Appbar.Content title="Personal Information" />
        <Button mode="contained" onPress={editProfile}>
          <Text>Edit Profile</Text>
        </Button>
      </Appbar.Header>

      {/* Profile Info */}
      {!loading && (
        <View style={styles.profileContainer}>
          {/* Left Section */}
          <View style={styles.imageSection}>
            <Image
              source={{
                uri: userInfo?.userImage || "https://placehold.co/150", // Default if no image
              }}
              style={styles.profileImage}
            />
            <Button mode="contained" onPress={onFileSelected}>
              <Text style={styles.uploadText}>Upload Photo</Text>
            </Button>
          </View>

          {/* Right Section */}
          <View style={styles.infoSection}>
            <Text style={styles.name}>Welcome {userInfo?.name}</Text>

            {/* FlatList to dynamically render the details */}
            <FlatList
              data={userDetails}
              renderItem={({ item }) => (
                <DetailItem label={item.label} value={item.value} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          {/* Edit Profile Modal */}
          <EditProfileModal
            visible={editModalVisible}
            onClose={() => setEditModalVisible(false)}
          />
        </View>
      )}
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
    fontFamily: "Fantasy",
    marginBottom: 16,
  },
  imageSection: {
    flex: 1,
    alignItems: "center",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Circular Image
    borderWidth: 4,
    borderColor: "#38BDF8",
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 14,
    fontFamily: "Fantasy",
  },
  detailItem: {
    flexDirection: "row",
    width: "50%",
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: "semibold",
    fontFamily: "Fantasy",
  },
  detailValue: {
    marginLeft: 4,
    fontFamily: "Fantasy",
    color: "gray",
  },
});

export default MFAAuthenticationScreen;
