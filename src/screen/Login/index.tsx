import React, {useContext} from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {UserContext} from '../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';

GoogleSignin.configure({
  webClientId:
    '452037702578-ka51mc757bm2qgtq271apask9ckq91n9.apps.googleusercontent.com',
});

function Login() {
  const {setUser} = useContext(UserContext);
  const navigation = useNavigation();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      navigation.navigate('Home');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.root}>
      <Button onPress={signIn} title="Đăng nhập google" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
