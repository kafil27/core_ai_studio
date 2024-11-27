// screens/VoiceScreen.jsx

import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import HomeScreenStyles from '../styles/HomeScreenStyles';

const VoiceScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = HomeScreenStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>This is the Voice Screen (Beta)</Text>
    </View>
  );
};

export default VoiceScreen;
