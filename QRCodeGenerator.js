import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot, {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {storage} from "./component/firebaseconfig";

function QRCodeGenerator(props) {
  const setLink = props.setLinkQR;
  const [qrData, setQrData] = useState('');
  const qrRef = useRef();


  const captureQRCode = () => {
    return new Promise((resolve, reject) => {
      captureRef(qrRef, { format: 'png' })
        .then(uri => resolve(uri))
        .catch(error => reject(error));
    });
  };

  // const captureQRCode = () => {
  //   return new Promise((resolve, reject) => {
  //     // Tạo ref cho component QRCode
  //     const qrRef = React.createRef(undefined);

  //     // Sử dụng ref để chụp ảnh QRCode
  //     qrRef.current.toDataURL(resolve, { format: 'png' });
  //   });
  // };
  
  const uploadQRCodeImage = async () => {
    try {
      const uri = await captureQRCode();
  
      const imagePath = `${RNFS.DocumentDirectoryPath}/qrcode.png`;
  
      await RNFS.moveFile(uri, imagePath);
  
      const imageFile = await RNFS.readFile(imagePath, 'base64');
  

      // Upload imageFile lên Firebase tại đây
      const imageRef = ref(storage,  `images/1212121}`); // Sử dụng hàm ref từ firebaseconfig
      uploadBytes(imageRef, imageFile).then((snapshot) => {
        console.log("uploadBytes")
        getDownloadURL(snapshot.ref).then((url) => {
          alert('success');
          console.log(url);
          setLink(url);
        });
      });
  
      console.log('File ảnh QR đã được upload');
    } catch (error) {
      console.log('Lỗi khi upload ảnh QR:', error);
    }
  };

  const qrValue = qrData || ' ';

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: 'red', marginVertical: 20, fontSize: 15, fontWeight: 'bold' }}>Chào mừng đến với app tạo mã QR</Text>
      {/* <ViewShot ref={qrRef}>
        <QRCode  value={qrValue} />
      </ViewShot> */}
      <ViewShot ref={qrRef}>
        <QRCode ref={qrRef} value={qrValue} />
      </ViewShot>
      <TextInput
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 3, borderColor: 'green', marginVertical: 20 }}
        placeholder='Nhập code or url vào đây'
        onChangeText={(text) => setQrData(text)}
        value={qrData}
      />
      <TouchableOpacity
        style={{ backgroundColor: qrData ? 'blue' : 'gray', padding: 10, borderRadius: 5, marginTop: 10 }}
        onPress={uploadQRCodeImage}
        disabled={!qrData}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Tạo và chia sẻ mã QR</Text>
      </TouchableOpacity>
    </View>
  );
}

export default QRCodeGenerator;

