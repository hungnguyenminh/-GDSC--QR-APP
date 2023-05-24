import QRCodeGenerator from './QRCodeGenerator';
import ScanScreen from './ScanScreen';
import React from 'react';
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ref,
  onValue,
  push,
  update,
  remove,
  set
} from 'firebase/database';

import { database } from './component/firebaseconfig'
const Stack = createStackNavigator();

function updateById(docId, Object) {
  const docRef = ref(database, '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/'+docId)
  let doc;
  onValue(docRef, (snapshot) => {
    doc = snapshot.val();
  });

  set(ref(database, '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/'+ docId), {
    ID: Object.ID,
    Name: Object.Age,
    Age: Object.Age,
    Email: Object.Email,
    LinkQR: '123566',
    Valid: Object.Valid
  });
}

function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  console.log("data",  data);

  const handlegenerator = () => {
    // remove(ref(database, '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1'));

    console.log("handlegenerator");

    for (const key in data) {
      console.log("data key", data[key]);

      console.log("data", data);
      console.log("key", key);
      

      const newObj = {
        Age: data[key].Age,
        Email: `${data[key].Age}@gdsc.com-check`,
        ID: data[key].ID,
        LinkQR: '123',
        Name: data[key].Name,
        Valid: data[key].Valid
      }

      updateById(key, newObj);
     
    }

  }

  useEffect(() => {
    const sheetRef = ref(database, '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1');
    onValue(sheetRef, (snapshot) => {
      console.log("1234", snapshot.val());
      setData(snapshot.val());
    });
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}
        onPress={handlegenerator}
        // onPress={()=> navigation.navigate("Screen1")}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>QRCodeGenerator</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, marginTop: 10, width: 130 }}
        onPress={() => navigation.navigate('Screen2')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>ScanScreen</Text>
      </TouchableOpacity>

    </View>

  );
}
export default HomeScreen;
