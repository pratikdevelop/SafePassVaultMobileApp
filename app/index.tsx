import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux"; // Import useSelector
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileSettingsScreen from "./screens/ProfileSettingsScreen";
import MFAVerificationScreen from "./screens/MFAVerificationScreen";
import SignupScreen from "./screens/SignupScreen";
import store from "./store/store";
import { loadToken } from "./store/actions/authAction";
import { Icon } from "react-native-paper";
import PasswordResetScreen from "./screens/PasswordResetScreen";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const IndexTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        tabBarIcon: ({ color, size }: any) => {
          let iconName = "";
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "account";
          }
          return <Icon source={iconName} color={color} size={24} />;
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={ProfileSettingsScreen}
      />
    </Tab.Navigator>
  );
};

const Index = () => {
  useEffect(() => {
    store.dispatch(loadToken());
  }, []);

  const token = useSelector((state: any) => state.auth.token); // Get token from Redux state

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={token ? "index" : "Login"}>
        {token ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="index"
              component={IndexTabs}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="forget-password"
              component={PasswordResetScreen}
            ></Stack.Screen>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Signup"
              component={SignupScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="MFAVerification"
              component={MFAVerificationScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
