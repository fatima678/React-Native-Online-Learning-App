
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import avatarImage from '../assets/avatar.png';

const RegisterUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      // Simulate user ID generation
      const userId = Date.now().toString();

      // Send user data to Firebase Realtime Database
      const response = await fetch("https://learningapp-153a1-default-rtdb.firebaseio.com/users.json", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email,
          password,
          displayName,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('User registered:', data);
      Alert.alert('Success', 'User registered successfully!');
      setEmail('');
      setPassword('');
      setDisplayName('');

      
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Error', 'There was an error registering the user. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={avatarImage} style={styles.avatar} />
      <Text style={styles.title}>Signup here</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        placeholderTextColor="#888"
        value={displayName}
        onChangeText={setDisplayName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>

     
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.textButton}>
        <Text style={styles.textButtonText}>Back </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    outlineWidth: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#154c79',
    textAlign: 'center',
    marginTop: 20,
  },
  textButton: {
    marginTop: 10,
    alignSelf: 'flex-start', 
    padding: 5, 
    borderColor: 'black', 
    borderWidth: 1, 
    borderRadius: 5, 
  },
  textButtonText: {
    color: 'black', 
    fontSize: 16,
    
  },
});

export default RegisterUser;

