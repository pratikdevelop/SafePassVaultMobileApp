import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, IconButton, List, Text } from "react-native-paper";
import PasswordViewScreen from "./PasswordViewScreen";
import { Drawer } from "react-native-magnus";
import service from "../services/passwordservice"; // Adjust the import path as necessary
import PasswordForm from "@/app/components/PasswordForm";
import Confirmation from "../components/Confirmation";
import BottomMenu from "../components/BottomDrawer";
import BottomSheet from "@gorhom/bottom-sheet";
const PasswordScreen = ({ navigation }: any) => {
  const [passwords, setPasswords] = useState<any[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [password, setPassword] = useState<any>(null);
  const [openDrawer, setDrawerOpen] = useState<boolean>(false);
  const [showModel, setShowModel] = useState(false);
  const [confirmModel, setConfirmModel] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const drawerRef = useRef<any>();
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

  const openMenu = (item: any) => {
    bottomSheetRef.current?.expand();
    setPassword(item);
  };

  let toggleDrawer = () => {
    drawerRef.current.close();
  };

  const closeMenu = (_action: string) => {
    if (_action === "delete") {
      setConfirmModel(true);
    } else if (_action === "edit") {
      setShowModel(true);
    } else if (_action === "passwordView") {
      drawerRef.current.open();
    }
    bottomSheetRef.current?.close();
    bottomSheetRef.current?.snapToPosition(0);
    bottomSheetRef.current?.forceClose()
  };

  const createPassword = () => {
    setPassword(null);
    setDrawerOpen(false);
    setShowModel(true);
  };
  const handleConfirm = () => {
    service.deletePassword(password._id).then((response: any) => {
      getPasswords();
      setConfirmModel(false);
    });
  };

  const toggleFavourite = async (passwordId: string) => {
    try {
      await service.fetchPasswords(passwordId);
      getPasswords();
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  function hideDialog(): void {
    setShowModel(false);
  }

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
                    onPress={openMenu}
                  ></IconButton>
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
      <PasswordForm
        visible={showModel}
        onDismiss={hideDialog}
        password={password}
      />
      <Confirmation
        confirmModel={confirmModel}
        title={"ConFirmation Dialog"}
        description={"Are You  Sure To delete this password?"}
        handleConfirm={handleConfirm}
        cancel={() => setConfirmModel(false)}
      />
      <Drawer
        ref={drawerRef}
        children={PasswordViewScreen({
          openDrawer,
          toggleDrawer,
          password,
          drawerRef,
        })}
      />
      <BottomMenu closeMenu={closeMenu} bottomSheetRef={bottomSheetRef} />

      <IconButton
        icon="plus"
        size={28}
        containerColor="blue"
        iconColor="white"
        style={styles.newPasswordButton}
        onPress={createPassword}
      ></IconButton>
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
  newPasswordButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PasswordScreen;
