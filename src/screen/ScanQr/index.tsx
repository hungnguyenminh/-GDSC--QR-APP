import React, {ReactElement, useContext, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {writeData} from '../../utils/firebase';
import {BarCodeReadEvent} from 'react-native-camera';
import {UserContext} from '../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';

function ScanQr(): ReactElement {
  const {user} = useContext(UserContext);

  const navigation = useNavigation();

  const [checkSuccess, setCheckSuccess] = useState(false);

  const onSuccess = (e: BarCodeReadEvent): void => {
    const idClass = e.data;
    writeData(idClass, {
      id: user.user.id,
      email: user.user.email,
      name: user.user.name,
    })
      .then(() => {
        setCheckSuccess(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  if (checkSuccess) {
    return (
      <View style={styles.container}>
        <Text>Check in thành công</Text>
        <Button
          title="Quay lại"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker={true}
        topContent={<Text style={styles.centerText}>Scan the QR code.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  successAlert: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 21,
    color: 'white',
  },
  buttonTouchable: {
    backgroundColor: 'rgb(0,122,255)',
    alignItems: 'center',
    width: 180,
    paddingHorizontal: 17,
    paddingVertical: 14,
    borderRadius: 12,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  linkText: {
    fontSize: 16,
    padding: 20,
    color: '#000',
    textAlign: 'center',
  },
  centerText: {},
});

export default ScanQr;
