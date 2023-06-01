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
import { useNavigation } from '@react-navigation/native';


export default function App() {
  const [platformHeight, setPlatformHeight] = useState(0);
const navigation = useNavigation();

  useEffect(() => {
    slideIn();
    setTimeout(() => {
      navigation.push('Screen3');
    }, 10 * 1000);
  }, []);
  

  const slideAnimation = useRef(new Animated.Value(500)).current;

  const slideIn = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnimation, {
      toValue: -500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onPlatformLayout = ({ nativeEvent }) => {
    setPlatformHeight(nativeEvent.layout.height);
  };

  const handleOnPressNavigation = () => {
     slideOut();
  };
  return (
    <>
      <Image
        source={require('../assets/award_bg.png')}
        style={styles.bgImage}
      />
      <StatusBar hidden={true} />
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX: slideAnimation }] },
        ]}>
        <Image source={require('../assets/avtar2.png')} style={styles.avatar} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textHeader}>D-Lister</Text>
          <Text style={styles.textSubHeader}>Sally</Text>
        </View>
      </Animated.View>

      <Text style={styles.resultsText}>Gave U Same Love</Text>
      <Text style={styles.likes}>15000</Text>

      <Image
        onLayout={onPlatformLayout}
        source={require('../assets/main-heart.png')}
        style={styles.heart}
      />

      <Pressable style={styles.btn} onPress={handleOnPressNavigation}>
        <Image source={require('../assets/arrow.png')} style={styles.arrow} />
      </Pressable>
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
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    top: '13%',
    left: '18%',
  },

  textHeader: {
    color: '#ffff80',
    fontSize: 36,
    textAlign: 'center',
  },

  textSubHeader: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    resizeMode: 'contain',
    marginRight: 30,
    borderWidth: 1,
    borderColor: 'yellow',
  },

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
    bottom: 175,
    left: '28%',
    width: '40%',
    resizeMode: 'contain',
  },

  likes: {
    position: 'absolute',
    color: '#ffff80',
    top: '43%',
    left: -8,
    zIndex: 1000,
    width: '100%',
    fontSize: 36,
    textAlign: 'center',
  },
  resultsText: {
    textShadowColor: 'white',
    textShadowRadius: 10,
    position: 'absolute',
    color: '#ffff80',
    top: '30%',
    width: '100%',
    fontSize: 32,
    textAlign: 'center',
  },
});
