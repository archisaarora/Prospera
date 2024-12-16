import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import DashboardScreen from './DashboardScreen';
import ProfileScreen from './ProfileScreen';
import ChatScreen from './ChatScreen';
import LoginScreen from './LoginScreen';
import SettingScreen from './SettingScreen';
import SignUpScreen from './SignUpScreen';
import CustomizeProfileScreen from './CustomizeProfileScreen'; // Added import for CustomizeProfileScreen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ChatScreen" component={ChatScreen} 
         options={{ headerShown: false }}
          />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomizeProfileScreen"
          component={CustomizeProfileScreen} // Added CustomizeProfileScreen here
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
