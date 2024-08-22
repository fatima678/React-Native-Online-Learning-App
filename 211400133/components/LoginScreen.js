
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
// import avatarImage from '../assets/avatar.png';

// const DATABASE_URL = 'https://learningapp-153a1-default-rtdb.firebaseio.com/users.json';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(DATABASE_URL);
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       console.log('Fetched users:', data);

//       // Check if any user matches the credentials
//       let userFound = false;
//       for (const key in data) {
//         const user = data[key];
//         console.log('Checking user:', user);
        
//         if (user.email === email && user.password === password) {
//           userFound = true;
//           break;
//         }
//       }
     
//       if (userFound) {
//         console.log('User logged in successfully');
//         Alert.alert('Success', 'Login successful!');
//         navigation.navigate('Home'); // Navigate to the Home screen
//       } else {
//         console.error('Invalid email or password');
//         Alert.alert('Error', 'Invalid email or password');
//       }
//     } catch (error) {
//       console.error('Login error:', error.message);
//       Alert.alert('Error', 'An error occurred during login.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={avatarImage} style={styles.avatar} />
//       <Text style={styles.title}>Login here</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//         <Text style={styles.link}>Don't have an account? Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//    avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 10,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     backgroundColor: '#f9f9f9',
//   },
//   button: {
//     backgroundColor: 'black',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   link: {
//     color: '#154c79',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import avatarImage from '../assets/avatar.png';

const DATABASE_URL = 'https://learningapp-153a1-default-rtdb.firebaseio.com/users.json';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(DATABASE_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Fetched users:', data);

      // Check if any user matches the credentials
      let userFound = false;
      for (const key in data) {
        const user = data[key];
        console.log('Checking user:', user);
        
        if (user.email === email && user.password === password) {
          userFound = true;
          break;
        }
      }
     
      if (userFound) {
        console.log('User logged in successfully');
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Home'); // Navigate to the Home screen
      } else {
        console.error('Invalid email or password');
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={avatarImage} style={styles.avatar} />
      <Text style={styles.title}>Login here</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
      
      {/* Custom Text Button with Border */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.textButton}>
        <Text style={styles.textButtonText}>Back </Text>
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
  link: {
    color: '#154c79',
    textAlign: 'center',
    marginTop: 20,
  },
  textButton: {
    marginTop: 10,
    alignSelf: 'flex-start', // Align to the left
    padding: 5, // Add padding to the button
    borderColor: 'black', // Border color matching the text color
    borderWidth: 1, // Thickness of the border
    borderRadius: 5, // Optional: Slightly round the edges
  },
  textButtonText: {
    color: 'black', // Same color as the login link for consistency
    fontSize: 16,
    
  },
});

export default LoginScreen;

