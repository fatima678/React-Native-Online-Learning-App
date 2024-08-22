
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0)).current; // Initialize opacity with 0

  useEffect(() => {
    // Animation for fading in the image
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000, // Duration of the animation in milliseconds
      useNativeDriver: true,
    }).start();

    // Navigate to the next screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Initial');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, opacity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />
      <Animated.Image
        source={require('../assets/online-learning.png')}
        style={[styles.image, { opacity }]} // Apply the animated opacity
      />
     
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  
});
