import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, IconButton, List, Text } from "react-native-paper";
import PasswordViewScreen from "../components/PasswordViewScreen";
import service from "../services/passwordservice"; // Adjust the import path as necessary
import PasswordForm from "@/app/components/PasswordForm";
import Confirmation from "../components/Confirmation";
import BottomMenu from "../components/BottomDrawer";
import MenuDrawer from "react-native-side-drawer";
import CommonService from "../services/CommonService";

const PasswordScreen = ({ navigation }: any) => {
  const [passwords, setPasswords] = useState<any[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [password, setPassword] = useState<any>(null);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [confirmModel, setConfirmModel] = useState(false);
  const [drawerRef, setDrawerRef] = useState<any>();
  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await CommonService.searchTags();
        console.log("res");

        setTags(res);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);
  useEffect(() => {
    getPasswords();
  }, [search]);

  const getPasswords = async () => {
    try {
      const data = await service.fetchPasswords(search);
      setPasswords(data);
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  let toggleDrawer = () => {
    setDrawerRef(false);
    getPasswords();
  };

  // Function to close the bottom sheet
  const handleCloseBottomSheet = (_action: string) => {
    if (_action === "delete") {
      setConfirmModel(true);
    } else if (_action === "edit") {
      setShowModel(true);
    } else if (_action === "view") {
      setDrawerRef(true);
    }
    setIsBottomSheetOpen(false);
  };

  const createPassword = () => {
    setPassword(null);
    setShowModel(true);
  };

  const handleConfirm = () => {
    service.deletePassword(password._id).then(() => {
      getPasswords();
      setConfirmModel(false);
    });
  };

  const toggleFavourite = async (passwordId: string) => {
    try {
      await service.addToFavorites(passwordId);
      getPasswords();
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  const hideDialog = () => {
    setShowModel(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          placeholder="Search"
          onChangeText={setSearch}
          value={search}
          style={styles.searchInput}
        />
        {passwords.length > 0 ? (
          <>
            {passwords.map((item) => (
              <List.Item
                key={item._id}
                titleStyle={{ fontWeight: "bold", textTransform: "capitalize" }}
                title={`${item.name}`}
                description={item.website}
                left={() => (
                  <IconButton
                    icon="star"
                    iconColor={item.isFavorite ? "yellow" : "gray"}
                    size={24}
                    onPress={() => toggleFavourite(item._id)}
                  />
                )}
                right={() => (
                  <IconButton
                    icon="dots-vertical"
                    mode="contained"
                    onPress={() => {
                      setPassword(item);
                      setIsBottomSheetOpen(true);
                    }}
                  />
                )}
              />
            ))}
          </>
        ) : (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>No passwords found</Text>
          </View>
        )}
      </View>
      <BottomMenu
        handleCloseBottomSheet={handleCloseBottomSheet}
        isBottomSheetOpen={isBottomSheetOpen}
      />

      {/* Use JSX to pass PasswordForm as component */}

      <MenuDrawer
        open={showModel}
        position={"left"}
        drawerContent={
          <PasswordForm
            showModel={showModel}
            hideDialog={hideDialog}
            password={password}
            tags={tags}
          />
        }
        drawerPercentage={100}
        animationTime={250}
        overlay={true}
        opacity={0.4}
      />

      <Confirmation
        confirmModel={confirmModel}
        title={"Confirmation Dialog"}
        description={"Are You Sure To delete this password?"}
        handleConfirm={handleConfirm}
        cancel={() => setConfirmModel(false)}
      />

      {/* Use JSX to pass PasswordViewScreen as component */}
      <MenuDrawer
        open={drawerRef}
        position={"right"}
        drawerContent={
          <PasswordViewScreen
            toggleDrawer={toggleDrawer}
            password={password}
            drawerRef={drawerRef}
          />
        }
        drawerPercentage={100}
        animationTime={250}
        overlay={true}
        opacity={0.4}
      />

      <IconButton
        icon="plus"
        size={28}
        containerColor="blue"
        iconColor="white"
        style={styles.newPasswordButton}
        onPress={createPassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  searchInput: {
    marginBottom: 20,
  },
  newPasswordButton: {
    borderRadius: 20,
    position: "absolute",
    bottom: 10,
    right: 20,
    color: "#ff55d3",
    alignItems: "center",
  },
});

export default PasswordScreen;
