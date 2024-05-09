import React, { useState } from 'react';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'App';
import {
  AuthScreenBackground,
  StyledButton,
  StyledTextInput,
} from '@components';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

type ErrorType = {
  [key: string]: string; // All keys are strings with string values
};

let EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [openGender, setOpenGender] = useState<boolean>(false);
  const [openBirthdate, setOpenBirthdate] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [birthdate, setBirthdate] = useState<Date | undefined>();

  const signUpHandler = async () => {
    setError({});
    const error: ErrorType = {};
    if (EMAIL_REGEX.test(email) === false) {
      error.email = "Email isn't valid";
    }

    if (password.length === 0) {
      error.password = 'Please fill this field';
    }
    if (confirmPassword !== password) {
      error.confirmPassword = 'Confirm password must be the same as password';
    }
    if (!birthdate) {
      error.birthdate = 'Please fill this field';
    }

    if (Object.keys(error).length !== 0) {
      setError(error);
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(`${process.env.API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          gender,
          birthDate: birthdate,
        }),
      });
      const responseJson = await response.json();
      if (response.ok) {
        ToastAndroid.show('Sukses! Silahkan login!', 5);
        navigation.navigate('Login');
      }
      throw new Error(responseJson.message);
    } catch (err: any) {
      ToastAndroid.show(err.message, 5);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AuthScreenBackground />
      {openBirthdate && (
        <DateTimePicker
          value={birthdate || new Date()}
          mode={'date'}
          onChange={(e, selectedDate) => {
            setOpenBirthdate(false);
            setBirthdate(selectedDate);
          }}
        />
      )}

      <View
        style={{
          paddingHorizontal: 42,
          flex: 1,
          justifyContent: 'center',
          gap: 40,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 38,
              color: '#B25723',
            }}
          >
            Join Us
          </Text>
          <Text style={{ color: '#B25723' }}>
            Because maintaining your emotion is important on each activity
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <StyledTextInput
            value={email}
            onChangeText={setEmail}
            label="Email"
            placeholder="johndoe@mail.com"
            error={error.email}
          />
          <StyledTextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            label="Password"
            placeholder="Enter your password"
            error={error.password}
          />
          <StyledTextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            label="Confirmation Password"
            placeholder="Re-enter your password"
            error={error.confirmPassword}
          />
          <StyledTextInput
            onFocus={() => setOpenBirthdate(true)}
            label="Birthdate"
            value={birthdate?.toLocaleDateString()}
            showSoftInputOnFocus={false}
            placeholder="dd/mm/yyyy"
            error={error.birthdate}
          />
          <View style={{ width: '100%', display: 'flex', gap: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>Gender</Text>
            <DropDownPicker
              style={{
                minHeight: 40,
                borderRadius: 10,
                borderColor: '#00000050',
                backgroundColor: 'transparent',
                borderWidth: 2,
              }}
              labelStyle={{ color: '#00000090' }}
              containerStyle={{ paddingBottom: 10 }}
              items={[
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' },
              ]}
              open={openGender}
              setOpen={setOpenGender}
              value={gender}
              setValue={setGender}
            />
            {error.gender && (
              <Text style={{ color: 'red' }}>{error.gender}</Text>
            )}
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <StyledButton title="Sign Up" onPress={signUpHandler} />
          <Text style={{ textAlign: 'center' }}>
            Have accounts?{' '}
            <Text
              style={{ color: '#877CFD', fontWeight: '500' }}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export { RegisterScreen };
