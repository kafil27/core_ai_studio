// components/ImageGenerator.jsx

// Import necessary libraries and hooks from React and React Native
import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text } from 'react-native';
import { generateImage } from '../services/api/deepai';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState(''); // State to hold the prompt text
  const [imageUrl, setImageUrl] = useState(''); // State to hold the generated image URL

  // Function to handle image generation
  const handleGenerateImage = async () => {
    const url = await generateImage(prompt); // Call the API to generate an image
    setImageUrl(url); // Set the generated image URL
  };

  return (
    <View>
      {/* Text input for the user to enter a prompt */}
      <TextInput
        placeholder="Enter prompt"
        value={prompt}
        onChangeText={setPrompt}
      />
      {/* Button to generate the image */}
      <Button title="Generate Image" onPress={handleGenerateImage} />
      {/* Display the generated image */}
      {imageUrl ? <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} /> : null}
    </View>
  );
};

export default ImageGenerator;
