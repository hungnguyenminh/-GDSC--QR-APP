import React, {ReactElement} from 'react';
import {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text,ImageBackground,Dimensions} from 'react-native';
import {ref, onValue, set} from 'firebase/database';
import {database} from './src/configs/firebase/firebaseconfig';
import QRCodeGenerator from "./QRCodeScreen/GeneratorQR";
interface Idata {
    ID: number;
    Name: string;
    Age: number;
    Email: string;
    LinkQR: string;
    Valid: boolean;
  }
  
  function updateById(docId: string, Object: Idata) {
    const docRef = ref(
      database,
      '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/' + docId,
    );
    let doc: Idata;
    onValue(docRef, snapshot => {
      doc = snapshot.val();
    });
  
    set(
      ref(
        database,
        '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/' + docId,
      ),
      {
        ID: Object.ID,
        Name: Object.Age,
        Age: Object.Age,
        Email: Object.Email,
        LinkQR: '123566',
        Valid: Object.Valid,
      },
    );
  }
  export default function QRCodeScreen(): ReactElement {
    const [data, setData] = useState<any>([]);
    const [isStart, setIsStart] = useState<boolean>(false);
    const { width, height } = Dimensions.get('window');
    console.log('data', data.length);
  
    useEffect(() => {
      const sheetRef = ref(
        database,
        '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1',
      );
      onValue(sheetRef, snapshot => {
        console.log('1234', snapshot.val());
        setData(snapshot.val());
      });
    }, []);
    return(
        <View style={{  alignItems: 'center', justifyContent: 'center'}}>
        <ImageBackground source={require('./src/assets/bg.png')}
        style = {{width,height,alignItems:'center'}}
        >
        {isStart &&
          data.map((item: any, index: number) => (
            <QRCodeGenerator key={index} item={item} itemKey={index} />
          ))}
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            marginTop: 150,
          }}
          onPress={() => {
            setIsStart(true);
            console.log('ssss');
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Xuất mã và tải lên firebase
          </Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    );
}