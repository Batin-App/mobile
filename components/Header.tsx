import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'App';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Header: React.FC<Props> = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../assets/splash.png')}
          style={{ width: 80, height: 80 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={require('../assets/profile.png')} />
      </TouchableOpacity>
    </View>
  );
};

export { Header };
