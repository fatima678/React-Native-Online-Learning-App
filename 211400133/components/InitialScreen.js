
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const InitialScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/online-learning.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Online Learning App</Text>
      </View>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AdminLogin')}
      >
        <Text style={styles.buttonText}>Admin Panel</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>User Panel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40, 
  },
  logo: {
    width: 150, 
    height: 150,
    marginBottom: 20, 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default InitialScreen;
