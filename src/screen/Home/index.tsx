import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {UserContext} from '../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const {user} = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View>
      <Text>Xin chào: {user.user.name}</Text>
      <Text>Quét mã Qr để checkin</Text>
      <Button
        onPress={() => {
          navigation.navigate('ScanQr');
        }}
        title="Add"
      />
    </View>
  );
}

export default Home;
