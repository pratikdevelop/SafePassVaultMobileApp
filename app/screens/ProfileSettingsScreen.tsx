import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import fs from 'fs'; // Import the File System module (if needed for certain environments).
import { IconButton } from 'react-native-paper';

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
            headerRight(props) {
              return (
                <IconButton
                mode='contained'
                style={
                  {
                    padding: 10,
                    margin: 10,

                  }
                }
                icon={'logout'} onPress={()=>{
                  console.log('logout pressed');
                  // Call the logout function here
                }}></IconButton>
                );
            },
            headerStyle: {
              backgroundColor: '#fff',
              borderColor:"#00000",
              elevation: 0,
            }
          }
        }
      >
        {Object.entries(screens).map(([name, Component]: any) => (
          <Drawer.Screen key={name} name={name}  options={{
            title: name,
            sceneContainerStyle:{
              backgroundColor:'#fff',
              borderTopWidth:2
            }
          }}  navigationKey={name} children={Component}/>
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
