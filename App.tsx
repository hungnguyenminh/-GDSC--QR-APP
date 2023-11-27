import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Home from './src/screen/Home';
import Login from './src/screen/Login';
import {UserProvider} from './src/provider/UserProvider';
import ScanQr from './src/screen/ScanQr';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ScanQr" component={ScanQr} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
