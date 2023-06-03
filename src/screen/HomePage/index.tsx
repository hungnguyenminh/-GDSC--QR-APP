import React, {ReactElement} from 'react';
import {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ref, onValue, set} from 'firebase/database';
import {database, linkSheet} from '../../configs/firebase/firebaseconfig';
import {updateById} from '../../utils/HandleFuntions';
import {useNetInfo} from '@react-native-community/netinfo';
import AlertStatus from '../../components/AlertStatus.js';

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
  const [isGenSuccess, setIsGenSuccess] = useState<boolean>(true);

  console.log('linkSheet', linkSheet);
  console.log("data", data);
  

  const handlegenerator = () => {
    // const docRef = database.ref('142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/');
    // docRef.remove();

    for (const key in data) {
      const newObj = {
        Age: data[key].Age,
        Email: data[key].Email,
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
      linkSheet,
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
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {netInfo.isConnected ? (
          <>
            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                paddingVertical: 15,
                borderRadius: 12,
                marginTop: 10,
                width: 150,
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
                paddingVertical: 15,
                borderRadius: 12,
                marginTop: 10,
                width: 150,
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
