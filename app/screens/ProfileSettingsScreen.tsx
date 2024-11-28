import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { IconButton } from "react-native-paper";
import store from "../store/store";
import { logoutUser } from "../store/actions/authAction";

const Drawer = createDrawerNavigator();
const loadScreens = () => {
  const screens: any = {};
  const screenFiles = [
    require("./PersonalDetailsScreen"),
    require("./SecurityTokenScreen"),
    require("./ChangePasswordScreen"),
    require("./EmailNotificationScreen"),
    require("./MFAAuthenticationScreen"),
    require("./PlanDetailsScreen"),
    require("./SingleSignOnScreen"),
    require("./KeyInspectorScreen"),
  ];

  screenFiles.forEach((screenFile: any) => {
    screens[screenFile.default.name] = screenFile.default;
  });

  return screens;
};

const ProfileSettingsScreen = ({ navigation }: { navigation: any }) => {
  const screens = loadScreens();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: "Profile",
        headerRight() {
          return (
            <IconButton
              mode="contained"
              style={{
                padding: 10,
                margin: 10,
              }}
              icon={"logout"}
              onPress={async () => {
                await store.dispatch(logoutUser());
                navigation.navigate("Login");
              }}
            ></IconButton>
          );
        },
        headerStyle: {
          backgroundColor: "#fff",
          borderColor: "#00000",
          elevation: 0,
        },
      }}
      initialRouteName="PersonalDetailsScreen"
    >
      {Object.entries(screens).map(([name, Component]: any) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{
            title: name,
            sceneContainerStyle: {
              backgroundColor: "#fff",
              borderTopWidth: 2,
            },
          }}
          navigationKey={name}
          children={Component}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default ProfileSettingsScreen;
