import { Text, ToastAndroid, View } from 'react-native';
import { useState } from 'react';
import { StyledButton } from './StyledButton';
import { LinearGradient } from 'expo-linear-gradient';
import { getItemAsync } from 'expo-secure-store';

const Recommendation: React.FC = () => {
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const ACTIVITES = [
    'Reading Book',
    'Watching TV',
    'Studying',
    'Playing Piano',
    'Washing Dishes',
  ];

  const getRecommendation = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/recommendations`, {
        headers: {
          Authorization: `Bearer ${await getItemAsync('AT')}`,
        },
      });

      const responseJson = await response.json();
      console.log(responseJson);
    } catch (err: any) {
      ToastAndroid.show(err.message, 5);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 30,
        justifyContent: 'center',
        marginTop: recommendations.length !== 0 ? 30 : 150,
      }}
    >
      <Text style={{ color: '#FFC700', fontWeight: 'bold', paddingBottom: 8 }}>
        What do you feel right now?
      </Text>

      <StyledButton onPress={getRecommendation} title="Recommend Something" />
      {recommendations.length !== 0 && (
        <>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              marginVertical: 20,
            }}
          >
            <Text
              style={{ color: '#B25723', fontWeight: 'bold', fontSize: 24 }}
            >
              Recommended Activity
            </Text>
          </View>
          <View>
            <View style={{ gap: 10 }}>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#9e9e9e50',
                }}
              />
              {ACTIVITES.map((activity, index) => (
                <>
                  <LinearGradient
                    key={index}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#CD7E17', '#FABF02']}
                    style={{
                      borderRadius: 10,
                      shadowColor: 'black',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3,
                      elevation: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        padding: 10,
                      }}
                    >
                      {activity}
                    </Text>
                  </LinearGradient>
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: '#9e9e9e50',
                    }}
                  />
                </>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export { Recommendation };
