import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const CourseDetail = ({ route }) => {
  const { courseId } = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`https://learningapp-153a1-default-rtdb.firebaseio.com/AddCourses/${courseId}.json`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course details: ', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#154c79" />
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No details available for this course.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.courseName}>{course.courseName}</Text>
      <Text style={styles.totalLectures}>Total Lectures: {course.totalLectures}</Text>
      <Text style={styles.courseDetails}>{course.courseDetails}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
    textAlign: 'center',
  },
  totalLectures: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  courseDetails: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    textAlign: 'left',
  },
});

export default CourseDetail;




