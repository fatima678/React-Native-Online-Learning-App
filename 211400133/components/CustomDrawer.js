// import React, { useRef } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import * as Animatable from 'react-native-animatable';

// const CustomDrawer = ({ visible, closeDrawer }) => {
//   const drawerRef = useRef(null);

//   React.useEffect(() => {
//     if (visible) {
//       drawerRef.current.slideInLeft(300);
//     } else {
//       drawerRef.current.slideOutLeft(300);
//     }
//   }, [visible]);

//   return (
//     <Animatable.View
//       ref={drawerRef}
//       style={[styles.drawerContainer, { display: visible ? 'flex' : 'none' }]}
//     >
//       <TouchableOpacity onPress={closeDrawer}>
//         <Text style={styles.drawerToggleText}>✖</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => { closeDrawer(); /* Navigate */ }}>
//         <Text style={styles.drawerItem}>View Users</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => { closeDrawer(); /* Navigate */ }}>
//         <Text style={styles.drawerItem}>Manage Content</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => { closeDrawer(); /* Navigate */ }}>
//         <Text style={styles.drawerItem}>Settings</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => { closeDrawer(); /* Navigate */ }}>
//         <Text style={styles.drawerItem}>View Courses</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => { closeDrawer(); /* Navigate */ }}>
//         <Text style={styles.drawerItem}>Logout</Text>
//       </TouchableOpacity>
//     </Animatable.View>
//   );
// };

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   drawerContainer: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     bottom: 0,
//     width: width * 0.75,
//     backgroundColor: '#fff',
//     padding: 20,
//     zIndex: 2,
//     elevation: 5,
//   },
//   drawerToggleText: {
//     fontSize: 24,
//     marginBottom: 20,
//     color: '#154c79',
//     textAlign: 'right',
//   },
//   drawerItem: {
//     fontSize: 18,
//     marginVertical: 10,
//   },
// });

// export default CustomDrawer;


// testing

// import React, { useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import * as Animatable from 'react-native-animatable';

// const CustomDrawer = ({ visible, closeDrawer }) => {
//   const drawerRef = useRef(null);

//   useEffect(() => {
//     if (visible) {
//       drawerRef.current?.slideInLeft(300);
//     } else {
//       drawerRef.current?.slideOutLeft(300);
//     }
//   }, [visible]);

//   return (
//     <Animatable.View
//       ref={drawerRef}
//       style={[styles.drawerContainer, { display: visible ? 'flex' : 'none' }]}
//       animation={visible ? 'slideInLeft' : 'slideOutLeft'}
//       duration={300}
//     >
//       <TouchableOpacity onPress={closeDrawer}>
//         <Text style={styles.drawerToggleText}>✖</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => { closeDrawer(); /* Navigate */ }}>
//         <Text style={styles.drawerItem}>View Users</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => { closeDrawer(); /* Navigate */ }}>
//         <Text style={styles.drawerItem}>Manage Content</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => { closeDrawer(); /* Navigate */ }}>
//         <Text style={styles.drawerItem}>Settings</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => { closeDrawer(); /* Navigate */ }}>
//         <Text style={styles.drawerItem}>View Courses</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => { closeDrawer(); /* Navigate */ }}>
//         <Text style={styles.drawerItem}>Logout</Text>
//       </TouchableOpacity>
//     </Animatable.View>
//   );
// };

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   drawerContainer: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     bottom: 0,
//     width: width * 0.5,
//     backgroundColor: '#fff',
//     padding: 20,
//     zIndex: 2,
//     elevation: 5,
//   },
//   drawerToggleText: {
//     fontSize: 24,
//     marginBottom: 40,
//     color: '#154c79',
//     textAlign: 'right',
//   },
//   drawerItem: {
//     fontSize: 18,
//     marginVertical: 10,
//     borderBottomWidth: 1, // Adds the bottom border
//     borderBottomColor: 'grey', // Sets the border color
//     paddingBottom: 10, // Adds space below the text before the border
//   },
// });

// export default CustomDrawer;

// testing 2
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const CustomDrawer = ({ visible, closeDrawer, navigation }) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (visible) {
      drawerRef.current?.slideInLeft(300);
    } else {
      drawerRef.current?.slideOutLeft(300);
    }
  }, [visible]);

  return (
    <Animatable.View
      ref={drawerRef}
      style={[styles.drawerContainer, { display: visible ? 'flex' : 'none' }]}
      animation={visible ? 'slideInLeft' : 'slideOutLeft'}
      duration={300}
    >
      <TouchableOpacity onPress={closeDrawer}>
        <Text style={styles.drawerToggleText}>✖</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { closeDrawer(); navigation.navigate('AdminPanel'); }}>
        <Text style={styles.drawerItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { closeDrawer(); navigation.navigate('ViewUsers'); }}>
        <Text style={styles.drawerItem}>View Users</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { closeDrawer(); navigation.navigate('ManageContent'); }}>
        <Text style={styles.drawerItem}>Manage Content</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { closeDrawer(); navigation.navigate('Settings'); }}>
        <Text style={styles.drawerItem}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { closeDrawer(); navigation.navigate('ViewCourses'); }}>
        <Text style={styles.drawerItem}>View Courses</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { closeDrawer(); navigation.navigate('AddCourses'); }}>
        <Text style={styles.drawerItem}>Add Courses</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { closeDrawer(); /* Handle Logout */ }}>
        <Text style={styles.drawerItem}>Logout</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.5,
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 2,
    elevation: 5,
  },
  drawerToggleText: {
    fontSize: 24,
    marginBottom: 40,
    color: '#154c79',
    textAlign: 'right',
  },
  drawerItem: {
    fontSize: 18,
    marginVertical: 10,
    borderBottomWidth: 1, // Adds the bottom border
    borderBottomColor: 'grey', // Sets the border color
    paddingBottom: 10, // Adds space below the text before the border
  },
});

export default CustomDrawer;



