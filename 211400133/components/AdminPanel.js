
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import backgroundImage from '../assets/bgadmin.jpg';

const AdminPanel = ({ navigation }) => {
  const slideAnim = useRef(new Animated.Value(-3000)).current; 

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0, 
      friction: 8, 
      useNativeDriver: true, 
    }).start();
  }, [slideAnim]);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <Animated.View style={[styles.contentContainer, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.title}>Admin Panel</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfile')}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>View Users</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewCourses')}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>View Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddCourses')}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Add Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Initial')}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
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
    width: '80%',
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

export default AdminPanel;

