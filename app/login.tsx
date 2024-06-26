import React, { useState } from 'react';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import {
  AuthScreenBackground,
  StyledButton,
  StyledTextInput,
} from '@components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'App';
import { setItemAsync } from 'expo-secure-store';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signInHandler = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message);
      }

      await setItemAsync('AT', responseJson.token);

      ToastAndroid.show('Login berhasil!', 5);
      navigation.navigate('Home');
    } catch (err: any) {
      ToastAndroid.show(err.message, 5);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AuthScreenBackground />
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Welcome Back</Text>
          <Text style={{ color: '#B25723' }}>
            Sign in and logs your activities to maintain your emotion
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            gap: 16,
          }}
        >
          <StyledTextInput
            placeholder="johndoe@email.com"
            label="Email"
            value={email}
            onChangeText={setEmail}
          />
          <StyledTextInput
            placeholder="Enter your password"
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={{ width: '100%', gap: 10 }}>
          <StyledButton title="Sign In" onPress={signInHandler} />
          <Text
            style={{ fontWeight: '500', textAlign: 'center', width: '100%' }}
          >
            Doesn't have account?{' '}
            <Text
              onPress={() => {
                navigation.navigate('Register');
              }}
              style={{ color: '#877CFD', fontWeight: '500' }}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 42,
    gap: 40,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 38,
    color: '#B25723',
  },
});

export { LoginScreen };
