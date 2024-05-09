import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { StyledButton } from './StyledButton';
import { LinearGradient } from 'expo-linear-gradient';

const OPTIONS = ['joy', 'love', 'anger', 'fear', 'surprise'];
type OptionType = (typeof OPTIONS)[number];

const Recommendation: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<OptionType>(OPTIONS[0]);
  const [showRecommended, setShowRecommended] = useState<boolean>(false);

  const ACTIVITES = [
    'Reading Book',
    'Watching TV',
    'Studying',
    'Playing Piano',
    'Washing Dishes',
  ];

  const items = OPTIONS.map((option) => ({
    label: option.charAt(0).toUpperCase() + option.slice(1),
    value: option,
  }));
  return (
    <View
      style={{
        paddingHorizontal: 30,
        justifyContent: 'center',
        marginTop: showRecommended ? 30 : 150,
      }}
    >
      <Text style={{ color: '#FFC700', fontWeight: 'bold', paddingBottom: 8 }}>
        What do you feel right now?
      </Text>
      <DropDownPicker
        style={{
          minHeight: 40,
          borderRadius: 10,
          borderColor: '#00000070',
          borderWidth: 2,
        }}
        containerStyle={{ paddingBottom: 10 }}
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        items={items}
      />
      <StyledButton
        onPress={() => setShowRecommended(true)}
        title="Recommend Something"
      />
      {showRecommended && (
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
