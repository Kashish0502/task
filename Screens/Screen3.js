import { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  View,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  const [platformHeight, setPlatformHeight] = useState(0);
  const [noOfLikes, setNoOfLikes] = useState(15000);
  const [textContainerHeight, setTextContainerHeight] = useState(0);
  const [intervalIdhandler, setIntervalIdhandler] = useState('');

  useEffect(() => {
    var intervalId = setInterval(() => {
      setNoOfLikes((prv) => prv + 1000);
    }, 500);
    setIntervalIdhandler(intervalId);
  }, []);

  useEffect(() => {
    if (parseInt(noOfLikes) > 40000 && intervalIdhandler) {
      return () => clearInterval(intervalIdhandler);
    }
  }, [noOfLikes, intervalIdhandler]);

  const onPlatformLayout = ({ nativeEvent }) => {
    setPlatformHeight(nativeEvent.layout.height);
  };

  const ontextContainerHeight = ({ nativeEvent }) => {
    setTextContainerHeight(nativeEvent.layout.height);
  };

  const handleOnPressNavigation = () => {
    navigation.dispatch(
      CommonActions.reset({
        routes: [
          {
            name: 'Screen1',
          },
        ],
      })
    );
  };
  
  return (
    <>
      <Image
        source={require('../assets/award_bg.png')}
        style={styles.bgImage}
      />
      <StatusBar hidden={true} />

      <View style={styles.textContainer}>
        <Text style={styles.resultsText}> 4 Friends Gave U </Text>
        <Text style={styles.resultsText}> Some Love </Text>
      </View>
      <Text style={styles.likes}>{noOfLikes}</Text>

      <Image
        onLayout={onPlatformLayout}
        source={require('../assets/main-heart.png')}
        style={styles.heart}
      />

      <Pressable style={styles.btn} onPress={handleOnPressNavigation}>
        <Image source={require('../assets/arrow.png')} style={styles.arrow} />
      </Pressable>

      <View style={styles.congratsContainer} onLayout={ontextContainerHeight}>
        <Text style={{ fontSize: 20 }}>Contgrats</Text>
        <View
          style={[styles.triangle, { top: textContainerHeight - 4 }]}></View>
      </View>
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
  arrow: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    resizeMode: 'contain',
  },
  btn: {
    position: 'absolute',
    top: '60%',
    left: '75%',
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

  heart: {
    position: 'absolute',
    bottom: '25%',
    left: '28%',
    width: '40%',
    resizeMode: 'contain',
  },

  congratsContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    right: '10%',
    top: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 125,
    height: 50,
    borderRadius: 20,
    borderColor: 'pink',
    borderWidth: 2,
  },

  triangle: {
    position: 'absolute',
    right: '70%',
    borderColor: 'white',
    borderWidth: 2,
    borderTopWidth: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 0,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  likes: {
    position: 'absolute',
    color: '#ffff80',
    top: '39%',
    left: -8,
    zIndex: 1000,
    width: '100%',
    fontSize: 36,
    textAlign: 'center',
  },

  textContainer: {
    position: 'absolute',
    top: '20%',
    width: '100%',
  },

  resultsText: {
    textShadowColor: 'white',
    textShadowRadius: 10,
    color: '#ffff80',
    fontSize: 32,
    textAlign: 'center',
  },
});
