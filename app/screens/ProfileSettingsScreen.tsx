import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import fs from 'fs'; // Import the File System module (if needed for certain environments).

const Drawer = createDrawerNavigator();

// Function to dynamically import screens
const loadScreens = () => {
  const screens: any = {};
  // List the screen imports manually or dynamically based on your folder structure.
  const screenFiles = [
    require('./PersonalDetailsScreen'),
    require('./SecurityTokenScreen'),
    require('./ChangePasswordScreen'),
    require('./EmailNotificationScreen'),
    require('./MFAAuthenticationScreen'),
    require('./PlanDetailsScreen'),
    require('./SingleSignOnScreen'),
    require('./KeyInspectorScreen'),
  ];

  screenFiles.forEach((screenFile: any) => {
    screens[screenFile.default.name] = screenFile.default;
  });

  return screens;
};

const ProfileSettingsScreen = () => {
  const screens = loadScreens();
  console.log('dd', screens);
  
  return (
      <Drawer.Navigator
        screenOptions={
          {
            headerTitle:"Profile",
            headerStyle: {
              backgroundColor: '#fff',
              
            }
          }
        }
      >
        {Object.entries(screens).map(([name, Component]: any) => (
          <Drawer.Screen key={name} name={name}   navigationKey={name} children={Component}/>
        ))}
      </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default ProfileSettingsScreen;
