


import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const AddCourses = ({ navigation }) => {
  const [courseName, setCourseName] = useState('');
  const [totalLectures, setTotalLectures] = useState('');
  const [courseDetails, setCourseDetails] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleAddCourse = async () => {
    if (!courseName || !totalLectures || !courseDetails) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch("https://learningapp-153a1-default-rtdb.firebaseio.com/AddCourses.json", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName,
          totalLectures,
          courseDetails,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Data added:', data);
      Alert.alert('Success', 'Course added successfully!');
      setCourseName('');
      setTotalLectures('');
      setCourseDetails('');
    } catch (error) {
      console.error('Error adding course: ', error);
      Alert.alert('Error', 'There was an error adding the course. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Course Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter course name"
        placeholderTextColor="#888"
        value={courseName}
        onChangeText={setCourseName}
      />

      <Text style={styles.label}>Total Lectures</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter total number of lectures"
        placeholderTextColor="#888"
        value={totalLectures}
        onChangeText={setTotalLectures}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Course Details</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter course details"
        placeholderTextColor="#888"
        value={courseDetails}
        onChangeText={setCourseDetails}
        multiline={true}
        numberOfLines={6}
      />

      <TouchableOpacity
        style={[styles.button, isButtonHovered && styles.buttonHover]}
        onPress={handleAddCourse}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    outlineWidth: 0,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top', 
    paddingTop: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonHover: {
    backgroundColor: '#123a63',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddCourses;
