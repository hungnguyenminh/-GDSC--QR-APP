import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

function QRCodeGenerator() {
  const [qrData, setQrData] = useState('');
  const qrRef = useRef();

  const shareQRCodeImage = () => {
    qrRef.current.capture().then((uri) => {
      const shareOptions = {
        title: 'Share QR Code',
        url: uri,
        type: 'image/png',
      };
      console.log(uri);
      Share.open(shareOptions)
        .then(() => {
          console.log('Shared successfully');
        })
        .catch((error) => {
          console.log('Error while sharing', error);
        });
    }).catch((error) => {
      console.log('Error while capturing QR code', error);
    });
  };

  const qrValue = qrData || ' ';

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: 'red', marginVertical: 20, fontSize: 15, fontWeight: 'bold' }}>Chào mừng đến với app tạo mã QR</Text>
      <ViewShot ref={qrRef}>
        <QRCode value={qrValue} />
      </ViewShot>
      <TextInput
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 3, borderColor: 'green', marginVertical: 20 }}
        placeholder='Nhập code or url vào đây'
        onChangeText={(text) => setQrData(text)}
        value={qrData}
      />
      <TouchableOpacity
        style={{ backgroundColor: qrData ? 'blue' : 'gray', padding: 10, borderRadius: 5, marginTop: 10 }}
        onPress={shareQRCodeImage}
        disabled={!qrData}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Tạo và chia sẻ mã QR</Text>
      </TouchableOpacity>
    </View>
  );
}

export default QRCodeGenerator;

