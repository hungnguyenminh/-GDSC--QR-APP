import React, {ReactElement} from 'react';
import {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ref, onValue, set} from 'firebase/database';
import {database} from '../../configs/firebase/firebaseconfig';
import {updateById} from '../../utils/HandleFuntions';
// import QRCodeGenerator from "../QRCodeGenerator";
import {useNetInfo} from '@react-native-community/netinfo';

interface Idata {
  ID: number;
  Name: string;
  Age: number;
  Email: string;
  LinkQR: string;
  Valid: boolean;
}

export default function HomePage(): ReactElement {
  const navigation = useNavigation();
  const [data, setData] = useState<any>([]);
  const [isStart, setIsStart] = useState<boolean>(false);
  const netInfo = useNetInfo();

  console.log('data', data.length);

  const handlegenerator = () => {
    // console.log('handlegenerator');
    // const docRef = database.ref('142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/');
    // docRef.remove();

    for (const key in data) {
      const newObj = {
        Age: data[key].Age,
        Email: `${data[key].Age}@gdsc.com-123`,
        ID: data[key].ID,
        LinkQR: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data[key].ID}`,
        Name: data[key].Name,
        Valid: data[key].Valid,
      };

      updateById(data[key].ID, newObj);
    }
  };

  useEffect(() => {
    const sheetRef = ref(
      database,
      '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1',
    );
    onValue(sheetRef, snapshot => {
      // console.log('1234', snapshot.val());
      setData(snapshot.val());
    });
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* {isStart &&
        data.map((item: any, index: number) => (
          <QRCodeGenerator key={index} item={item} itemKey={index} />
        ))} */}

      <ImageBackground
        source={require('../../assets/bg.png')}
        resizeMode="cover"
        style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        {netInfo.isConnected ? (
          <>
            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={handlegenerator}
              // onPress={() => {
              //   setIsStart(true);
              //   console.log('ssss');
              // }}
            >
              <Text style={{color: 'white', textAlign: 'center'}}>
                QRCodeGenerator
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
                width: 130,
              }}
              onPress={() => navigation.navigate('ScanQR')}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                ScanScreen
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{color: 'black', textAlign: 'center'}}>
            No internet connection
          </Text>
        )}
      </ImageBackground>
    </View>
  );
}
