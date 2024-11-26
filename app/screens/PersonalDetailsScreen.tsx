import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Appbar, Button } from "react-native-paper";
import EditProfileModal from "../components/editprofilemodal";
import authService from "../services/authService";
import { useSelector } from "react-redux";

const PersonalDetailsScreen = () => {
  const token = useSelector((state: any) => state.auth.token);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [user, setUser] = useState<any>({});
  const [plan, setPlan] = useState({ plan: "Free" });
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch user profile data
  useEffect(() => {
    fetchProfile();
  }, [token]); // Re-run fetch if token changes

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profile = await authService.getProfile(token);
      const userInfo = profile.user;
      setUser(userInfo); // Update the state directly
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection (no implementation currently)
  const onFileSelected = async () => {
    try {
    } catch (error) {
      console.error("File selection error:", error);
      Alert.alert("Error", "Could not select image.");
    }
  };

  // Open edit profile modal
  const editProfile = () => {
    setEditModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
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
                  uri: user?.userImage || "https://placehold.co/150", // Default if no image
                }}
                style={styles.profileImage}
              />
              <Button mode="contained" onPress={onFileSelected}>
                <Text style={styles.uploadText}>Upload Photo</Text>
              </Button>
            </View>

            {/* Right Section */}
            <View style={styles.infoSection}>
              <Text style={styles.name}>
                Welcome {user?.name || "User"}
              </Text>
              <View style={styles.infoGrid}>
                <DetailItem label="Role" value={user?.role || "N/A"} />
                <DetailItem
                  label="Email"
                  value={user?.email || "N/A"}
                />
                <DetailItem
                  label="Phone"
                  value={`+${user?.phone || "N/A"}`}
                />
                <DetailItem
                  label="Created at"
                  value={
                    user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"
                  }
                />
                <DetailItem
                  label="Address"
                  value={
                    user?.billingAddress
                      ? `${user.billingAddress}, ${user?.city || ""}`
                      : "N/A"
                  }
                />
                <DetailItem label="City" value={user?.city || "N/A"} />
                <DetailItem
                  label="State"
                  value={user?.state || "N/A"}
                />
                <DetailItem
                  label="Postal Code"
                  value={user?.postalCode || "N/A"}
                />
                <DetailItem
                  label="Country"
                  value={user?.country || "N/A"}
                />
                <DetailItem
                  label="Organization"
                  value={
                    user?.organization?.length > 0
                      ? user.organization[0]?.name
                      : "N/A"
                  }
                />
                <DetailItem label="Plan" value={plan?.plan || "N/A"} />
                <DetailItem
                  label="MFA Status"
                  value={user?.mfaEnabled ? "Enabled" : "Disabled"}
                />
              </View>
            </View>

            {/* Edit Profile Modal */}
            <EditProfileModal
              visible={editModalVisible}
              onClose={() => setEditModalVisible(false)}
            />
          </View>
        </>
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
    fontWeight: "semibold",
    fontFamily: "Fantasy",
  },
  detailValue: {
    marginLeft: 4,
    fontFamily: "Fantasy",
    color: "gray",
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
});

export default PersonalDetailsScreen;
