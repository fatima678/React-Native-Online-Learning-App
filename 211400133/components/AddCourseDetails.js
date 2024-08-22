
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker, ScrollView } from 'react-native';

const AddCourseDetails = ({ navigation }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseContent, setCourseContent] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("https://learningapp-153a1-default-rtdb.firebaseio.com/AddCourses.json");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const coursesArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      console.log('Fetched Courses:', coursesArray); 
      setCourses(coursesArray);
    } catch (error) {
      console.error('Error fetching courses: ', error);
    }
  };

  const handleAddContent = async () => {
    if (!selectedCourse || !courseContent) {
      Alert.alert('Error', 'Please select a course and add content.');
      return;
    }

    try {
      const response = await fetch("https://learningapp-153a1-default-rtdb.firebaseio.com/CourseContents.json", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourse,
          content: courseContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      Alert.alert('Success', 'Content added successfully!');
      navigation.navigate('ViewCourses'); 
    } catch (error) {
      console.error('Error adding content: ', error);
      Alert.alert('Error', 'There was an error adding the content. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Course Content</Text>
      <Text style={styles.label}>Select a Course</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(itemValue) => setSelectedCourse(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a course" value="" />
          {courses.map((course) => (
            <Picker.Item key={course.id} label={course.courseName} value={course.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Course Content</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter the content of the course"
        value={courseContent}
        onChangeText={setCourseContent}
        multiline={true}
        numberOfLines={6}
      />

      <TouchableOpacity onPress={handleAddContent} style={styles.button}>
        <Text style={styles.buttonText}>Add Content</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  pickerContainer: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  textArea: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#154c79',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddCourseDetails;

