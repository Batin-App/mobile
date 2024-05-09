import { LinearGradient } from 'expo-linear-gradient';
import { Image, Modal, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyledButton } from './StyledButton';
import { useState } from 'react';
import { StyledTextInput } from './StyledTextInput';

const ActivityList: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newActivity, setNewActivity] = useState<string>('');

  const ACTIVITES = [
    'Reading Book',
    'Watching TV',
    'Studying',
    'Playing Piano',
    'Washing Dishes',
  ];

  const addNewActivityHandler = () => {
    setShowModal(false);
    setNewActivity('');
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000050',
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 7,
              padding: 18,
              width: '100%',
              maxWidth: 300,
              gap: 8,
            }}
          >
            <View style={{ gap: 4 }}>
              <Text>Your activity</Text>
              <StyledTextInput
                value={newActivity}
                onChangeText={setNewActivity}
                placeholder="Doing yoga"
              />
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}
            >
              <StyledButton
                onPress={() => {
                  setShowModal(false);
                  setNewActivity('');
                }}
                variant="secondary"
                title="Cancel"
              />
              <StyledButton onPress={addNewActivityHandler} title="Save" />
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ gap: 20, marginTop: 80 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <TouchableOpacity>
            <Image source={require('../assets/arrow.png')} />
          </TouchableOpacity>
          <Text style={{ color: '#B25723', fontWeight: 'bold', fontSize: 24 }}>
            Today
          </Text>
          <TouchableOpacity>
            <Image
              style={{ transform: [{ scaleX: -1 }] }}
              source={require('../assets/arrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ gap: 10, paddingHorizontal: 30 }}>
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
            <StyledButton
              onPress={() => setShowModal(true)}
              title="+ Add New Activity"
            />
          </View>
        </View>
      </View>
    </>
  );
};

export { ActivityList };
