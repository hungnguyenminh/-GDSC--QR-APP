import { Button, ScrollView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { onValue, ref, set } from 'firebase/database';
import { database } from './firebase/config';
import React from 'react';
import ScanScreen from './components/ScanScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

interface Participant {
  ID: number,
  Name: String,
  Age: Number,
  Email: String,
  LinkQR: String,
  Valid: boolean
}

export default function App() {

  // const [data, setData] = useState<Participant>({
  //     ID: 0,
  //     Name: '',
  //     Age: 0,
  //     Email: '',
  //     LinkQR: '',
  //     Valid: false
  // });

  // function writeUserData(newKey: string) {
  //   set(ref(database, '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/'+ newKey), {
  //     ID: newKey,
  //     Name: 'Testing from React',
  //     Age: 9969,
  //     Email: 'pson@gmail.com',
  //     LinkQR: '',
  //     Valid: true
  //   });
  // }

  // function updateById(docId: string) {
  //   const docRef = ref(database, '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/'+docId)
  //   let doc;
  //   onValue(docRef, (snapshot) => {
  //     doc = snapshot.val();
  //   });
  //   set(ref(database, '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/'+ docId), {
  //     ID: docId,
  //     Name: 'Testing from React',
  //     Age: 9969,
  //     Email: 'pson@gmail.com',
  //     LinkQR: '',
  //     Valid: true
  //   });
  //   console.log(doc);
  // }

  // useEffect(() => {
  //   const sheetRef = ref(database,'142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1');
  //   onValue(sheetRef, (snapshot) => {
  //     console.log(snapshot.val());
  //     setData(snapshot.val());
  //   });
    
  // }, []);

  // return (
  //   <ScrollView>
  //     {Object.entries(data).map(([key, value]) => (
  //       <View key={key}>
  //         <Text>{key}</Text>
  //         <Text>{value.ID}</Text>
  //         <Text>{value.Name}</Text>
  //         <Text>{value.Age}</Text>
  //         <Text>{value.Email}</Text>
  //         <Text>{value.LinkQR}</Text>
  //         <Text>{value.Valid}</Text>
  //       </View>
  //     ))}
  //     <Button title="Add Data" onPress={() => {writeUserData("-NW77VmFXoj2P5H3prg5"); updateById("2")}} />
  //   </ScrollView>
  // );

  return <ScanScreen/>
}