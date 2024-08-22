
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ManageContent = ({ navigation }) => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Manage Content</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('AddCourseDetails')} style={styles.button}>
        <Text style={styles.buttonText}>Add Course Details</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ViewCourses')} style={styles.button}>
        <Text style={styles.buttonText}>View Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#154c79',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ManageContent;

