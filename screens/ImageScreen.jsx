// screens/ImageScreen.jsx

import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import HomeScreenStyles from '../styles/HomeScreenStyles';

const ImageScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = HomeScreenStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>This is the Image Screen</Text>
    </View>
  );
};

export default ImageScreen;
