


import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';

const EditCourse = ({ route, navigation }) => {
  const { course } = route.params;
  const [courseName, setCourseName] = useState(course.courseName);
  const [totalLectures, setTotalLectures] = useState(course.totalLectures);
  const [courseDetails, setCourseDetails] = useState(course.courseDetails);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleUpdateCourse = async () => {
    try {
      const response = await fetch(`https://learningapp-153a1-default-rtdb.firebaseio.com/AddCourses/${course.id}.json`, {
        method: 'PATCH',
        headers: {
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

      Alert.alert('Success', 'Course updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating course: ', error);
      Alert.alert('Error', 'There was an error updating the course. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Course Name</Text>
      <TextInput
        style={styles.input}
        value={courseName}
        onChangeText={setCourseName}
      />
      
      <Text style={styles.label}>Total Lectures</Text>
      <TextInput
        style={styles.input}
        value={totalLectures}
        onChangeText={setTotalLectures}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Course Details</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={courseDetails}
        onChangeText={setCourseDetails}
        multiline={true}
        numberOfLines={5}
      />

      <TouchableOpacity
        style={[styles.button, isButtonHovered && styles.buttonHover]}
        onPress={handleUpdateCourse}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        <Text style={styles.buttonText}>Update Course</Text>
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
    backgroundColor: '#fff',
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
    marginBottom: 20,
    paddingHorizontal: 10,
    outlineWidth: 0,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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

export default EditCourse;

