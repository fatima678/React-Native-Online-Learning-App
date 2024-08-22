//with welcome message at top of screen
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import backgroundImage from '../assets/bgadmin.jpg'; 

const HomeScreen = ({ navigation }) => {
  const slideAnim = useRef(new Animated.Value(-3000)).current; 
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Slide in the menu buttons
    Animated.spring(slideAnim, {
      toValue: 0, 
      friction: 8, 
      useNativeDriver: true, 
    }).start();

    // Fade in the welcome message
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // After fading in, wait 4 seconds, then fade out
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => setShowWelcome(false)); // Hide message after fade out
      }, 4000);
    });
  }, [slideAnim, fadeAnim]);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.contentContainer}>
        {showWelcome && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.welcomeText}>Welcome to LearningApp</Text>
          </Animated.View>
        )}
        <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={styles.title}>Home Screen</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserViewCourses')}
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>View Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewUsers')}
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Total Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Initial')}
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    color:'#800000',
    backgroundColor:"rgba(0,0,0,0.8)",
    padding:20
  },
  menuContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
});

export default HomeScreen;




