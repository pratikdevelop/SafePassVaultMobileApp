// screens/HomeScreen.js
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import PasswordScreen from './PasswordScreen';
import NotesScreen from './NotesScreen';
import CardScreen from './CardScreen';
import FileScreen from './FileScreen';
import { Icon } from 'react-native-paper';

const HomeScreen = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Passwords"
      screenOptions={{
        headerBackgroundContainerStyle:{
          borderWidth:1,
          borderColor:'gray',
          backgroundColor:"#ff4543"
        },
        drawerStyle: {
          backgroundColor: '#f0f0f0',
        },
      }}
    >
      <Drawer.Screen 
      navigationKey="password"
      name="Passwords" options={{
        headerBackgroundContainerStyle:{
          borderWidth:1,
          borderColor:'gray',
          backgroundColor:"#ff4543"
        },
        drawerIcon: ({ color }) => (
          <Icon source="shield-lock-outline" color={color} size={24} />
        )
      }} component={PasswordScreen} />
      <Drawer.Screen options={{
        headerBackgroundContainerStyle:{
          borderWidth:1,
          borderColor:'gray',
          backgroundColor:"#ff4543"
        },
        drawerLabel: 'Notes',
        drawerIcon(props) {
            return <Icon source="note-outline" size={24} color="#000" />;
        },
      }} name="Notes" component={NotesScreen} />
      <Drawer.Screen options={{
        headerBackgroundContainerStyle:{
          borderWidth:1,
          borderColor:'gray',
          backgroundColor:"#ff4543"
        },
        drawerLabel: 'Cards',
        drawerIcon(props) {
          return <Icon source="credit-card-outline" size={24} color="#000" />;
          },
      }} name="Card" component={CardScreen} />
      <Drawer.Screen options={{
        headerBackgroundContainerStyle:{
          borderWidth:1,
          borderColor:'gray',
          backgroundColor:"#ff4543"
        },
        drawerLabel: 'Files',
        drawerIcon(props) {
          return <Icon source='file-outline' size={24} color='#000'></Icon>
        }
      }} name="File Management" component={FileScreen} />
    </Drawer.Navigator>
  );
};


export default HomeScreen;
