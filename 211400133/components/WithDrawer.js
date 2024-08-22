import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CustomDrawer from './CustomDrawer';

const WithDrawer = (WrappedComponent) => {
  return (props) => {
    const [drawerVisible, setDrawerVisible] =useState(false);

    const toggleDrawer = () => {
      setDrawerVisible(prev => !prev);
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.drawerToggle}
          onPress={toggleDrawer}
        >
          <Text style={styles.drawerToggleText}>☰</Text>
        </TouchableOpacity>
        <CustomDrawer visible={drawerVisible} closeDrawer={toggleDrawer} navigation={props.navigation} />
        <WrappedComponent {...props} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerToggle: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 3,
  },
  drawerToggleText: {
    fontSize: 30,
    color: '#154c79',
  },
});

export default WithDrawer;
