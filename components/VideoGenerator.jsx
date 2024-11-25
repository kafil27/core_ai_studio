// components/VideoGenerator.jsx

// Import necessary libraries and hooks from React and React Native
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { generateVideo } from '../services/api/anotherApi';

const VideoGenerator = () => {
  const [prompt, setPrompt] = useState(''); // State to hold the prompt text
  const [videoUrl, setVideoUrl] = useState(''); // State to hold the generated video URL

  // Function to handle video generation
  const handleGenerateVideo = async () => {
    const url = await generateVideo(prompt); // Call the API to generate a video
    setVideoUrl(url); // Set the generated video URL
  };

  return (
    <View>
      {/* Text input for the user to enter a prompt */}
      <TextInput
        placeholder="Enter prompt"
        value={prompt}
        onChangeText={setPrompt}
      />
      {/* Button to generate the video */}
      <Button title="Generate Video" onPress={handleGenerateVideo} />
      {/* Display the generated video URL */}
      {videoUrl ? <Text>Video generated: {videoUrl}</Text> : null}
    </View>
  );
};

export default VideoGenerator;
