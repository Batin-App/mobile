import { LinearGradient } from 'expo-linear-gradient';
import { Image, Modal, Text, ToastAndroid, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyledButton } from './StyledButton';
import { useEffect, useState } from 'react';
import { StyledTextInput } from './StyledTextInput';
import { format } from 'date-fns';
import * as SecureStore from 'expo-secure-store';

const ActivityList: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newActivity, setNewActivity] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [activities, setActivites] = useState<string[]>([]);
  const [summarizedEmotion, setSummarizedEmotion] = useState<string>('');

  const addNewActivityHandler = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/logs`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync('AT')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          activity: newActivity,
        }),
      });

      const responseJson = await response.json();
      setShowModal(false);
      setNewActivity('');
      getLogs();
    } catch (err: any) {
      ToastAndroid.show(err.message, 5);
    }
  };

  const getSummarizeEmotion = async () => {
    try {
      console.log(date);
      const response = await fetch(
        `${process.env.API_URL}/logs/summary?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync('AT')}`,
          },
        },
      );
      const responseJson = await response.json();
      setSummarizedEmotion(responseJson.predictedEmotion);
    } catch (err: any) {
      ToastAndroid.show(err.message, 5);
    }
  };

  const getLogs = async () => {
    try {
      const response = await fetch(
        `${
          process.env.API_URL
        }/logs?date=${date.getUTCFullYear()}-5-${date.getUTCDate()}`,
        {
          headers: new Headers({
            Authorization: `Bearer ${await SecureStore.getItemAsync('AT')}`,
          }),
        },
      );
      const responseJson = await response.json();
      setActivites(
        responseJson.map(
          ({ description }: { description: string }) => description,
        ),
      );
    } catch (err: any) {
      ToastAndroid.show(err.message, 5);
    }
  };

  const isToday =
    date.setUTCHours(0, 0, 0, 0) === new Date().setUTCHours(0, 0, 0, 0);

  useEffect(() => {
    getLogs();
  }, [date]);

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
              <Text>Summarize Result:</Text>
              <Text>{summarizedEmotion}</Text>
            </View>
            <StyledButton onPress={addNewActivityHandler} title="Save" />
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
          <TouchableOpacity
            onPress={() => {
              const newDate = new Date(date);
              newDate.setDate(newDate.getDate() - 1);
              setDate(newDate);
            }}
          >
            <Image source={require('../assets/arrow.png')} />
          </TouchableOpacity>
          <Text style={{ color: '#B25723', fontWeight: 'bold', fontSize: 24 }}>
            {isToday ? 'Today' : format(date, 'EEEE, dd MMMM')}
          </Text>
          {!isToday && (
            <TouchableOpacity
              onPress={() => {
                const newDate = new Date(date);
                newDate.setDate(newDate.getDate() + 1);
                setDate(newDate);
              }}
            >
              <Image
                style={{ transform: [{ scaleX: -1 }] }}
                source={require('../assets/arrow.png')}
              />
            </TouchableOpacity>
          )}
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
            {activities.map((activity, index) => (
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
      <View style={{ position: 'absolute', bottom: 0 }}>
        <StyledButton
          title="Summarize Today Emotion"
          onPress={getSummarizeEmotion}
        />
      </View>
    </>
  );
};

export { ActivityList };
