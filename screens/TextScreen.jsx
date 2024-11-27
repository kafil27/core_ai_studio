// screens/TextScreen.jsx

import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import HomeScreenStyles from '../styles/HomeScreenStyles';

const TextScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = HomeScreenStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>This is the Text Screen</Text>
    </View>
  );
};

export default TextScreen;
