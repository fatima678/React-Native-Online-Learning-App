
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, Animated, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const UserViewCourses = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
      setCourses(coursesArray);
      setFilteredCourses(coursesArray); 
      startFadeIn();
    } catch (error) {
      console.error('Error fetching courses: ', error);
    } finally {
      setLoading(false);
    }
  };

  const startFadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = courses.filter(course =>
        course.courseName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  };

  const renderCourse = ({ item }) => (
    <Animated.View style={[styles.courseContainer, { opacity: fadeAnim }]}>
      <View style={styles.courseNameContainer}>
        <Text style={styles.courseNameLarge}>{item.courseName}</Text>
      </View>
      <Text style={styles.totalLectures}>Total Lectures: {item.totalLectures}</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })} style={styles.icon}>
          <FontAwesome name="eye" size={20} color="blue" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#154c79" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Courses"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCourses}
        renderItem={renderCourse}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Available Courses</Text>
        )}
        numColumns={2} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  courseContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    flex: 1,
    maxWidth: '45%',
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150, 
  },
  courseNameContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  courseNameLarge: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
  totalLectures: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default UserViewCourses;


