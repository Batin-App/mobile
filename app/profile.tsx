import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'App';
import {
  HomeScreenBackground,
  StyledButton,
  StyledTextInput,
} from '@components';
import { deleteItemAsync, getItemAsync } from 'expo-secure-store';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const signOutHandler = async () => {
    await deleteItemAsync('AT');
    navigation.navigate('Login');
  };

  const getProfile = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${await getItemAsync('AT')}`,
        },
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error('Silahkan login kembali!');
      }

      setEmail(responseJson.user.email);
      setBirthdate(responseJson.user.birthDate);
      setGender(responseJson.user.gender);
    } catch (err: any) {
      ToastAndroid.show(err.message, 5);
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View>
      <HomeScreenBackground />
      <View style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <StyledTextInput label="Email" value={email} isReadOnly={true} />
        <StyledTextInput
          label="Birthdate"
          value={new Date(birthdate).toLocaleDateString('en-GB')}
          isReadOnly={true}
        />
        <StyledTextInput label="Gender" value={gender} isReadOnly={true} />
        <StyledButton
          title="Sign Out"
          color={'#FF5D00'}
          onPress={signOutHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 30,
    height: '100%',
    gap: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 38,
    color: '#B25723',
  },
});

export { ProfileScreen };
