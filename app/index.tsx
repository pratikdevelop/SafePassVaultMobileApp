import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider, useSelector} from 'react-redux'; // Import useSelector
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileSettingsScreen from './screens/ProfileSettingsScreen';
import MFAVerificationScreen from './screens/MFAVerificationScreen';
import SignupScreen from './screens/SignupScreen';
import store from './store/store';
import {loadToken} from './store/actions/authAction';
import {PaperProvider} from 'react-native-paper';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const IndexTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}: any) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size}: any) => {
          let iconName = '';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen name="Profile" component={ProfileSettingsScreen} />
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
          <Stack.Navigator initialRouteName={token ? 'index' : 'Login'}>
            {token ? (
              <>
                <Stack.Screen
                  options={{headerShown: false}}
                  name="index"
                  component={IndexTabs}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  options={{headerShown: false}}
                  name="Login"
                  component={LoginScreen}
                />
                <Stack.Screen
                  options={{headerShown: false}}
                  name="Signup"
                  component={SignupScreen}
                />
                <Stack.Screen
                  options={{headerShown: false}}
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
