import React from 'react';
import {View, TouchableOpacity, Text,ImageBackground,StyleSheet,Dimensions } from 'react-native';
import { useNavigation} from '@react-navigation/native';

export default function HomePage(){
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./src/assets/bg.png')}
      style = {{width,height,alignItems:'center'}}
      >
      <TouchableOpacity
        style = {styles.buttonScreen1}
        onPress={() => navigation.navigate('Screen1')}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          QRCodeGenerator
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
       style = {styles.buttonScreen2}
        onPress={() => navigation.navigate('Screen2')}>
        <Text style={{color: 'white', textAlign: 'center'}}>ScanScreen</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonScreen1: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 250,
    width: 150,
  },
  buttonScreen2: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 55,
    width: 150,
  },
});


