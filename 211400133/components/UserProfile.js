
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Animated, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import icon library

const FetchUserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); 
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        setUsers(userList);
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

  const handleEdit = (user) => {
    setEditingUser(user);
    setDisplayName(user.displayName || '');
    setEmail(user.email || '');
    setPassword(user.password || '');
  };

  const handleDelete = async (userId) => {
    try {
      await fetch(`https://learningapp-153a1-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user.id !== userId));
      Alert.alert('Success', 'User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'There was an error deleting the user. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = { displayName, email, password };
      await fetch(`https://learningapp-153a1-default-rtdb.firebaseio.com/users/${editingUser.id}.json`, {
        method: 'PATCH',
        body: JSON.stringify(updatedUser),
      });
      setUsers(users.map(user => (user.id === editingUser.id ? { ...user, ...updatedUser } : user)));
      setEditingUser(null);
      Alert.alert('Success', 'User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Error', 'There was an error updating the user. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#154c79" />
      </View>
    );
  }

  const renderUser = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.displayName || 'N/A'}</Text>
      <Text style={styles.tableCell}>{item.email || 'N/A'}</Text>
      <Text style={styles.tableCell}>{item.password || 'N/A'}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <FontAwesome name="edit" size={24} color="blue" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <FontAwesome name="trash" size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.tableContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Registered Users</Text>
        {editingUser ? (
          <View style={styles.editContainer}>
            <Text style={styles.title}>Edit User</Text>
            <TextInput
              style={styles.input}
              placeholder="Display Name"
              value={displayName}
              onChangeText={setDisplayName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setEditingUser(null)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Name</Text>
              <Text style={styles.tableHeaderCell}>Email</Text>
              <Text style={styles.tableHeaderCell}>Password</Text>
              <Text style={styles.tableHeaderCell}>Actions</Text>
            </View>
            <View style={styles.tableBody}>
              <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
              />
            </View>
          </>
        )}
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
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    fontSize:'10',
  },
  tableCell: {
    flex: 1,
    textAlign: 'left',
  },
  icon: {
    marginHorizontal: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  editContainer: {
    marginTop: 20,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    color: '#fff',
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    marginTop: 10,
  },
  tableBody: {
    maxHeight: 400, 
    overflow: 'hidden',
  },
});

export default FetchUserData;
