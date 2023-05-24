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
import {database} from './src/configs/firebase/firebaseconfig'
import {
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database';

class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      scannedLink: null
    };
  }
  array = [
    {
      Name: "tuyen",
      organize: "gdsc-ptit",
      email: "@gdscptit.dev"
    },
    {
      Name: "son",
      organize: "gdsc-ptit",
      email: "@gdscptit.dev"
    },
    {
      Name: "hung",
      organize: "gdsc-ptit",
      email: "@gdscptit.dev"
    },
    {
      Name: "Khiem",
      organize: "gdsc-ptit",
      email: "@gdscptit.dev"
    },
    {
      Name: "duy",
      organize: "gdsc-ptit",
      email: "@gdscptit.dev"
    },
  ];
  onSuccess = e => {
    for(let i = 0; i < this.array.length; i++)
    {
       if(e.data === this.array[i].Name)
       {
        push(ref(database, '/users/info'), {
          Name: this.array[i].Name,
          organize: this.array[i].organize,
          email: e.data +"ptit"+ this.array[i].email
        });
        break;
       }
    }
    
    this.setState({ scannedLink: e.data, showScanner: false });
  };
  onScan = () => {
    this.setState({ showScanner: true });
  };

  onOpenLink = () => {
    Linking.openURL(this.state.scannedLink);
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
            {this.state.scannedLink ? (
              <View style={styles.linkContainer}>
                <Text style={styles.linkText}>{this.state.scannedLink}</Text>
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={this.onOpenLink}
                >
                  <Text style={styles.buttonText}>Open</Text>
                </TouchableOpacity>
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