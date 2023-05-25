import React, {useRef} from 'react';
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';
import {Button, ImageBackground, View} from 'react-native';

export default function GenQR() {
  const qrCodeRef = useRef(null);
  const getQrCodeImage = async () => {
    try {
      const uri = await captureRef(qrCodeRef, {
        format: 'png',
        quality: 1,
      });

      console.log('QR code image:', uri);
    } catch (error) {
      console.error('Failed to capture QR code:', error);
    }
  };

  const qrCodeData = 'Your QR code data'; // Dữ liệu mã QR của bạn

  return (
    <View>
      <QRCode ref={qrCodeRef} value={qrCodeData}  />
      <Button title="Get QR Code Image" onPress={getQrCodeImage} />
    </View>
  );
}
