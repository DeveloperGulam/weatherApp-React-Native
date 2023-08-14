import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; 
import NotFound from './screens/NotFound';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar style="auto" /> */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
