import React from 'react'
import { useState } from 'react';
import { View, Modal, Text, Pressable, StyleSheet } from 'react-native';

const AlertStatus = (props) => {

  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalText}>
            {props.status ? (<Text style={styles.modalTextSuccess}>{props.name}</Text>) : (<Text style={styles.modalTextFail}>{props.name}</Text>)}
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'while',
  },
  modalView: {
    // width: 300,
    // height: 200,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    backgroundColor: 'rgb(0,122,255)',
    alignItems: 'center',
    width: 200,
    padding: 16,
    borderRadius: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  modalTextSuccess: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color: 'rgb(0,122,255)',
  },
  modalTextFail: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },
  modalText: {
    width: 300,
    height: 200,
    alignItems: 'center',
    marginTop: 10,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AlertStatus;
