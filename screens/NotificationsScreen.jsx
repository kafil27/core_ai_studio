// screens/NotificationsScreen.jsx

import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import CommonScreenStyles from '../styles/CommonScreenStyles';

const NotificationsScreen = () => {
  const { theme } = useSelector((state) => state.theme);
  const styles = CommonScreenStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.text, { color: theme.text }]}>
          This is the Notifications Screen
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
