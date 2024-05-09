import { Image, View } from 'react-native';

const HomeScreenBackground: React.FC = () => {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        right: 0,
      }}
    >
      <Image
        source={require('../assets/batin-transparent.png')}
        style={{ width: 250, objectFit: 'contain' }}
      />
      <Image
        style={{
          width: 120,
          objectFit: 'contain',
          position: 'absolute',
          top: '50%',
          right: 10,
        }}
        source={require('../assets/smile-transparent.png')}
      />
    </View>
  );
};

export { HomeScreenBackground };
