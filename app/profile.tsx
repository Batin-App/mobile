import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'App';
import { HomeScreenBackground, StyledButton, StyledTextInput } from '@components';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const signOutHandler = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <HomeScreenBackground/>
      <View style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <StyledTextInput
          label="Email"
          value={"email@gmail.com"}
          isReadOnly={true}
          />
        <StyledTextInput
          label="Birthdate"
          value={"09/02/2021"}
          isReadOnly={true}
          />
        <StyledTextInput
          label="Gender"
          value={"FEMALE"}
          isReadOnly={true}
        />
        <StyledButton title="Sign Out" color={"#FF5D00"} onPress={signOutHandler}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
