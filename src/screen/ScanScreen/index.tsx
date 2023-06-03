import React, {Component, ReactElement, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Linking,ImageBackground} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ref, get, set} from 'firebase/database';
import {database, linkSheet} from '../../configs/firebase/firebaseconfig.js';
import AlertStatus from '../../components/AlertStatus.js'

function containsSpecialCharacters(str) {
  var specialCharacters = [".", "#", "$", "[", "]"];

  for (var i = 0; i < specialCharacters.length; i++) {
    if (str.includes(specialCharacters[i])) {
      return true;
    }
  }

  return false;
}

function ScanSrceen(): ReactElement {
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [scannerLink, setScannerLink] = useState<string | null>(null);


  const [check, setCheck] = useState(false);

  const onSuccess = (e) => {
    const docId = e.data;
    //chứa kí tự đặc biệt
    if (containsSpecialCharacters(docId)) {
      setScannerLink("docID not valid");
      setShowScanner(false);
      return;
    }
    //cập nhật doc
    get(ref(database, '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/'+docId)).then(snapshot => {
      if (snapshot.exists()) {
        //lấy dữ liệu doc cũ
        let oldDoc = snapshot.val();
        console.log(oldDoc);

        //đổi dữ liệu doc cũ
        oldDoc["Valid"] = true;

        //tạo biến đại diện doc mới
        const newDoc = oldDoc;

        //đẩy dữ liệu mới lên firebase
        set(ref(database, '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/'+docId), newDoc);

        setCheck(true);
      } else {
        setCheck(false);
        setScannerLink("No data available");
        console.log("No data available");
      }
  })
  .catch((error) => {
      console.error(error);
  });

    setShowScanner(false);
    setScannerLink(docId);

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
      <ImageBackground
        source={require('../../assets/bg.png')}
        resizeMode="cover"
        style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
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
              {check ? ((<AlertStatus name="Check in thành công" status={true}></AlertStatus>)) : (<AlertStatus name="Mã QR không hợp lệ" status={false}></AlertStatus>)}
              {/* <Text style={styles.linkText}>{scannerLink}</Text> */}
              {/* <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={onOpenLink}>
                <Text style={styles.buttonText}>Open</Text>
              </TouchableOpacity> */}
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
      </ImageBackground>
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
    marginBottom:20
  },
  buttonText: {
    fontSize: 21,
    color: 'white',
  },
  buttonTouchable: {
    backgroundColor:'rgb(0,122,255)',
    alignItems: 'center',
    width: 200,
    padding: 16,
    borderRadius:5,
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
  centerText: {

  }
});

export default ScanSrceen;
