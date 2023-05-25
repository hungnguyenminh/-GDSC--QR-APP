import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import QRCodeGenerator from './src/screen/QRCodeGenerator';
import ScanScreen from './src/screen/ScanScreen';
import HomePage from './src/screen/HomePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerStyle: {
          backgroundColor: '#060b0f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="GenerateQR" component={QRCodeGenerator} />
        <Stack.Screen name="ScanQR" component={ScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}