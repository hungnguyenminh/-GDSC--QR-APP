import React, {useContext} from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
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
      <View>
        <Image
          source={require('../../access/logo.png')}
          style={styles.logo}
          resizeMode="cover"
        />
        <Text style={styles.text}>Đăng nhập để bắt đầu</Text>
      </View>
      <GoogleSigninButton onPress={signIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
  },
  text: {
    alignItems: 'center',
    fontWeight: '600',
    marginBottom: 50,
    fontSize: 26,
    color: '#3b82f6',
  },
});

export default Login;
