// screens/VideoScreen.jsx

import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import CommonScreenStyles from '../styles/CommonScreenStyles';
import CustomHeader from '../components/CustomHeader';

const VideoScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = CommonScreenStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Video Generation" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.text}>
            This is the Video Screen
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default VideoScreen;
