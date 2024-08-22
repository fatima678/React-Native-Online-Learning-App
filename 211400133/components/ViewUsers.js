


import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Animated } from 'react-native';

const FetchUserData = () => {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://learningapp-153a1-default-rtdb.firebaseio.com/users.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const userList = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setUserCount(userList.length);
        startFadeIn(); 
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'There was an error fetching the user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const startFadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 2000, 
      useNativeDriver: true, 
    }).start();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#154c79" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.userCountContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Total Registered Users</Text>
        <Text style={styles.userCount}>{userCount}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCountContainer: {
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  userCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default FetchUserData;


