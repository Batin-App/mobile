import { ScrollView, Text, ToastAndroid, View } from 'react-native';
import { useState } from 'react';
import { StyledButton } from './StyledButton';
import { LinearGradient } from 'expo-linear-gradient';
import { getItemAsync } from 'expo-secure-store';

const Recommendation: React.FC = () => {
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const getRecommendation = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/recommendations`, {
        headers: {
          Authorization: `Bearer ${await getItemAsync('AT')}`,
        },
      });

      const responseJson = await response.json();
      const activitiesArray = responseJson.recommendedActivities
        .split(/\d+\.\s+/)
        .filter((text: string) => text.trim().length > 0)
        .map((text: string) => text.trim());
      setRecommendations(activitiesArray);
    } catch (err: any) {
      ToastAndroid.show(err.message, 5);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 30,
        justifyContent: 'center',
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
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ gap: 10 }}>
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#9e9e9e50',
                  }}
                />
                {recommendations.map((activity, index) => (
                  <>
                    <LinearGradient
                      key={`recommendation-${index}`}
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
                        key={`line-${index}`}
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
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export { Recommendation };
