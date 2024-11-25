// components/TextGenerator.jsx

// Import necessary libraries and hooks from React and React Native
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { generateText } from '../services/api/openai';

const TextGenerator = () => {
  const [prompt, setPrompt] = useState(''); // State to hold the prompt text
  const [generatedText, setGeneratedText] = useState(''); // State to hold the generated text

  // Function to handle text generation
  const handleGenerateText = async () => {
    const text = await generateText(prompt); // Call the API to generate text
    setGeneratedText(text); // Set the generated text
  };

  return (
    <View>
      {/* Text input for the user to enter a prompt */}
      <TextInput
        placeholder="Enter prompt"
        value={prompt}
        onChangeText={setPrompt}
      />
      {/* Button to generate the text */}
      <Button title="Generate Text" onPress={handleGenerateText} />
      {/* Display the generated text */}
      {generatedText ? <Text>{generatedText}</Text> : null}
    </View>
  );
};

export default TextGenerator;
