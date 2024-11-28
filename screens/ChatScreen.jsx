// screens/ChatScreen.jsx

// Import necessary libraries and components from React and React Native
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import CommonScreenStyles from '../styles/CommonScreenStyles';
import CustomHeader from '../components/CustomHeader';

const ChatScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = CommonScreenStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Chat" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.text}>
            This is the Chat Screen
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
