// screens/NotificationsScreen.jsx

import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import CommonScreenStyles from '../styles/CommonScreenStyles';

const NotificationsScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = CommonScreenStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.text, { color: isDarkMode ? 'white' : 'black' }]}>
          This is the Notifications Screen
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
