// screens/VideoScreen.jsx

// Import necessary libraries and components from React and React Native
import React from 'react';
import { View } from 'react-native';
import VideoGenerator from '../components/VideoGenerator';

const VideoScreen = () => {
  return (
    <View>
      {/* VideoGenerator component for generating videos */}
      <VideoGenerator />
    </View>
  );
};

export default VideoScreen;
