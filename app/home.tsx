import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'App';
import { ActivityList, Recommendation, StyledButton } from '@components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [page, setPage] = useState<'ACTIVITY' | 'RECOMMENDATION'>('ACTIVITY');

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          source={require('../assets/batin-transparent.png')}
          style={{ position: 'absolute', top: '30%', left: -100 }}
        />
        <Image
          source={require('../assets/smile-transparent.png')}
          style={{ position: 'absolute', right: 5, top: '20%' }}
        />
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 10,
          }}
        >
          <StyledButton
            onPress={() => setPage('ACTIVITY')}
            variant={page === 'ACTIVITY' ? 'primary' : 'secondary'}
            title="Activity Log"
          />
          <StyledButton
            onPress={() => setPage('RECOMMENDATION')}
            variant={page === 'RECOMMENDATION' ? 'primary' : 'secondary'}
            title="Recommendation"
          />
        </View>
        {page === 'RECOMMENDATION' ? <Recommendation /> : <ActivityList />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export { HomeScreen };
