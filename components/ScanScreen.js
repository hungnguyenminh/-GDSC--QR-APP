'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {database} from '../firebase/config'
import {
  ref,
  set,
  get
} from 'firebase/database';

function containsSpecialCharacters(str) {
  var specialCharacters = [".", "#", "$", "[", "]"];

  for (var i = 0; i < specialCharacters.length; i++) {
    if (str.includes(specialCharacters[i])) {
      return true;
    }
  }

  return false;
}

class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      scannedMessage: null
    };
  }

  onSuccess = e => {

    const docId = e.data;
    let message = null;

    if (containsSpecialCharacters(docId)) {
      this.setState({ scannedMessage: "docID not valid!", showScanner: false });
      return;
    }
    
    get(ref(database, '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/'+docId)).then(snapshot => {
        if (snapshot.exists()) {
          //lấy dữ liệu doc cũ
          let oldDoc = snapshot.val();
          console.log(oldDoc);

          //đổi dữ liệu doc cũ
          oldDoc["Valid"] = true;

          //tạo biến đại diện doc mới
          const newDoc = oldDoc;
          message = JSON.stringify(newDoc);

          //đẩy dữ liệu mới lên firebase
          set(ref(database, '142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1/'+docId), newDoc);
        } else {
          //console.log("No data available");
          message = "No data available";
        }
    })
    .catch((error) => {
        //console.error(error);
        message = error;
    });

    this.setState({ ...this, scannedMessage: message, showScanner: false });
  };

  onScan = () => {
    this.setState({ showScanner: true });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.showScanner ? (
          <QRCodeScanner
            onRead={this.onSuccess}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            reactivate={true}
            reactivateTimeout={5000}
            showMarker={true}
            topContent={
              <Text style={styles.centerText}>
                Scan the QR code.
              </Text>
            }
          />
        ) : (
          <>
            {this.state.scannedMessage ? (
              <View style={styles.linkContainer}>
                <Text style={styles.linkText}>{this.state.scannedMessage}</Text>
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={this.onScan}
                >
                  <Text style={styles.buttonText}>Scan</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={this.onScan}
              >
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 100
  },
  linkText: {
    fontSize: 16,
    padding: 20,
    color: '#000',
    textAlign: 'center'
  }
});
export default ScanScreen;