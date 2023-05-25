import React, {ReactElement} from 'react';
import {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import {ref, onValue, set} from 'firebase/database';
import {database} from '../../configs/firebase/firebaseconfig';
import QRCodeGenerator from "../QRCodeGenerator";


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

export default function HomePage(): ReactElement {
  const navigation = useNavigation();
  const [data, setData] = useState<any>([]);
  const [isStart, setIsStart] = useState<boolean>(false);

  console.log('data', data.length);

  // const Handlegenerator = (props: any) => {
  //   const {item, itemKey} = props;
  //   const qrRef = useRef<any>();

  //   const shareQRCodeImage = async () => {
  //     try {
  //       qrRef.current.capture().then((uri) => {
  //         console.log(uri);
  //         fetch(uri)
  //           .then((response) => response.blob())
  //           .then((blob) => {
  //             //Upload imageFile lên Firebase tại đây
  //             const imageRef = refStorage(storage, `images/${itemKey}`); // Sử dụng hàm ref từ firebaseconfig
  //             uploadBytes(imageRef, blob).then(snapshot => {
  //               console.log('uploadBytes');
  //               getDownloadURL(snapshot.ref).then(url => {
  //                 console.log(url);
  //               });
  //             });
  
  //           })
  
  //       }).catch((error) => {
  //         console.log('Error while capturing QR code', error);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const newObj = {
  //     Age: item.Age,
  //     Email: `${item.Age}@gdsc.com-check`,
  //     ID: item.ID,
  //     LinkQR: '123',
  //     Name: item.Name,
  //     Valid: item.Valid,
  //   };

  //   useEffect(() => {
  //     shareQRCodeImage();
  //   }, []);
  //   // updateById(itemKey, newObj);

  //   return (
  //     <ViewShot ref={qrRef}>
  //       <QRCode value={item.ID.toString()} />
  //     </ViewShot>
  //   );
  // };

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
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {isStart &&
        data.map((item: any, index: number) => (
          <QRCodeGenerator key={index} item={item} itemKey={index} />
        ))}

      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
        }}
        // onPress={handlegenerator}
        onPress={() => {
          setIsStart(true);
          console.log('ssss');
        }}>
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
        onPress={() => navigation.navigate('Screen2')}>
        <Text style={{color: 'white', textAlign: 'center'}}>ScanScreen</Text>
      </TouchableOpacity>
    </View>
  );
}


