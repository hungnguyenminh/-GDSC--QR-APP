import React, {Component, ReactElement, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Linking} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';
import {ref, onValue, push, update, remove} from 'firebase/database';
import {database} from '../../configs/firebase/firebaseconfig.js';

function ScanSrceen(): ReactElement {
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [scannerLink, setScannerLink] = useState<string | null>(null);
  const array = [
    {
      Name: 'tuyen',
      organize: 'gdsc-ptit',
      email: '@gdscptit.dev',
    },
    {
      Name: 'son',
      organize: 'gdsc-ptit',
      email: '@gdscptit.dev',
    },
    {
      Name: 'hung',
      organize: 'gdsc-ptit',
      email: '@gdscptit.dev',
    },
    {
      Name: 'Khiem',
      organize: 'gdsc-ptit',
      email: '@gdscptit.dev',
    },
    {
      Name: 'duy',
      organize: 'gdsc-ptit',
      email: '@gdscptit.dev',
    },
  ];
  const onSuccess = e => {
    for (let i = 0; i < array.length; i++) {
      if (e.data === array[i].Name) {
        push(ref(database, '/users/info'), {
          Name: array[i].Name,
          organize: array[i].organize,
          email: e.data + 'ptit' + array[i].email,
        });
        break;
      }
    }
    setShowScanner(false);
    setScannerLink( e.data);
    // this.setState({scannedLink: e.data, showScanner: false});
  };
  const onScan = () => {
    // this.setState({showScanner: true});
    setShowScanner(true);
  };

  const onOpenLink = () => {
    Linking.openURL(scannerLink);
    // this.setState({showScanner: true});
    setShowScanner(true);
  };
  return (
    <View style={styles.container}>
      {showScanner ? (
        <QRCodeScanner
          onRead={onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          reactivate={true}
          reactivateTimeout={5000}
          showMarker={true}
          topContent={<Text style={styles.centerText}>Scan the QR code.</Text>}
        />
      ) : (
        <>
          {scannerLink ? (
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>{scannerLink}</Text>
              <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={onOpenLink}>
                <Text style={styles.buttonText}>Open</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonTouchable} onPress={onScan}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.buttonTouchable} onPress={onScan}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          )}
        </>
      )}
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
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
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
});

export default ScanSrceen;
