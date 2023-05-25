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
          backgroundColor: 'rgb(72, 109, 228)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Screen1" component={QRCodeGenerator} />
        <Stack.Screen name="Screen2" component={ScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}