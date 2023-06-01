import { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  const [platformHeight, setPlatformHeight] = useState(0);
  const [time, setTime] = useState(59);

  const [intervalCallId, setIntervalCallId] = useState('');
  const [fontsLoaded] = useFonts({
    'Zeyada-Regular': require('../assets/fonts/Zeyada-Regular.ttf'),
  });

  useEffect(() => {
    var intervalId = setInterval(() => {
      setTime(prev=>parseInt(prev) - 1);
    }, 1000);
    setIntervalCallId(intervalId); 
  }, []);

  useEffect(() => {
    if (parseInt(time) === 56 && intervalCallId) {
      navigation.push('Screen2');
      return () => clearInterval(intervalCallId);
    }
  }, [time, intervalCallId]);

  if (!fontsLoaded) {
    return null;
  }
  const onPlatformLayout = ({ nativeEvent }) => {
    setPlatformHeight(nativeEvent.layout.height);
  };

  return (
    <>
      <Image
        source={require('../assets/award_bg.png')}
        style={styles.bgImage}
      />
      <StatusBar hidden={true} />
      <View style={styles.container}></View>
      <View style={styles.castingContainer}>
        <Image
          source={require('../assets/castingLogo.png')}
          style={styles.castingLogo}
        />
        <Text style={styles.timeText}>04:52:{time}</Text>
        <Text style={styles.castingText}>CASTING CALL</Text>
      </View>
      <Text style={styles.resultsText}>The Results R In!</Text>
      <Image
        onLayout={onPlatformLayout}
        source={require('../assets/awardPlatform.png')}
        style={styles.platformImage}
      />
      <Image
        source={require('../assets/girlClap.png')}
        style={[styles.girl, { bottom: platformHeight - 25 }]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  bgImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  girl: {
    position: 'absolute',
    left: '25%',
    height: '40%',
    width: '50%',
  },
  platformImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  castingContainer: {
    position: 'absolute',
    height: '15%',
    width: '100%',
    top: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  castingLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  castingText: {
    fontSize: 40,
    top: -10,
    color: 'pink',
    fontFamily: 'Zeyada-Regular',
    transform: [{ rotate: '-10deg' }],
  },
  timeText: {
    fontSize: 20,
    top: -50,
    left: 5,
    color: 'white',
    transform: [{ rotate: '-15deg' }],
  },
  resultsText: {
    position: 'absolute',
    color: '#ffff80',
    top: '40%',
    width: '100%',
    fontSize: 32,
    textAlign: 'center',
  },
});
