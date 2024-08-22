import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import avatarImage from '../assets/avatar.png';

// URL pointing to the Admin node in the Firebase Realtime Database
const DATABASE_URL = 'https://learningapp-153a1-default-rtdb.firebaseio.com/Admin.json';

const AdminLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = async () => {
    try {
      // Fetching admin credentials from Firebase Realtime Database
      const response = await fetch(DATABASE_URL);
      const data = await response.json();

      if (!response.ok || data === null) {
        throw new Error('Failed to fetch admin data');
      }

      console.log('Fetched admin data:', data);

      // Check if the fetched credentials match the entered username and password
      const isValidAdmin = data.email === email && data.password === password;

      if (isValidAdmin) {
        console.log('Admin logged in successfully');
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('AdminPanel'); 
      } else {
        console.error('Invalid username or password');
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={avatarImage} style={styles.avatar} />
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdminLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AdminLoginScreen;


