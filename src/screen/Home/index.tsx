import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {UserContext} from '../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const {user} = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <View style={styles.bannerWrap}>
        <Image
          source={{
            uri: user.user.photo,
          }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.textHello}>Xin chào!!!</Text>
          <Text style={styles.textUser}>{user.user.name}</Text>
        </View>
      </View>

      <View style={styles.inforWrap}>
        <Text style={styles.textTitle}>Thông tin cá nhân: </Text>
        <Text style={styles.textLabel}>
          Họ và tên: <Text style={styles.textValue}>{user.user.name}</Text>
        </Text>
        <Text style={styles.textLabel}>
          Email: <Text style={styles.textValue}>{user.user.email}</Text>
        </Text>
        <Text style={styles.textLabel}>
          ID: <Text style={styles.textValue}>{user.user.id}</Text>
        </Text>
      </View>

      <View style={styles.qrWrap}>
        <Text style={styles.textQr}>Quét mã Qr để checkin</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('ScanQr');
          }}>
          <Image
            source={{
              uri: 'https://img.freepik.com/premium-vector/scan-qr-code-flat-icon-with-phone-barcode-illustration_149152-6.jpg',
            }}
            style={styles.icon}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 16,
    marginVertical: 50,
    justifyContent: 'space-between',
    flex: 1,
  },
  icon: {
    height: 300,
    width: 300,
    borderRadius: 20,
  },
  textHello: {
    fontSize: 20,
    color: 'white',
  },
  textUser: {
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
  },
  bannerWrap: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inforWrap: {
    padding: 20,
    backgroundColor: '#bfdbfe',
    marginVertical: 20,
    borderRadius: 15,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  textLabel: {
    fontWeight: '600',
    color: '#64748b',
    marginTop: 10,
  },
  textValue: {
    color: '#64748b',
    fontWeight: '400',
  },
  avatar: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
  qrWrap: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: '#a78bfa',
    alignItems: 'center',
    borderRadius: 10,
  },
  textQr: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 20,
    color: '#fff',
  },
});

export default Home;
