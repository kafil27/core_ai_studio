// components/Chat.jsx

// Import necessary libraries and hooks from React and React Native
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { generateText } from '../services/api/openai'; // Example using OpenAI for chat

const Chat = () => {
  const [messages, setMessages] = useState([]); // State to hold the chat messages
  const [input, setInput] = useState(''); // State to hold the input text

  // Function to handle sending a message
  const handleSendMessage = async () => {
    const newMessage = { user: 'You', text: input }; // Create a new message object
    setMessages([...messages, newMessage]); // Add the new message to the chat
    const response = await generateText(input); // Call the API to generate a response
    const botMessage = { user: 'Bot', text: response }; // Create a bot response message
    setMessages([...messages, newMessage, botMessage]); // Add the bot response to the chat
    setInput(''); // Clear the input field
  };

  return (
    <View>
      {/* List of chat messages */}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text>
            <Text>{item.user}: </Text>
            {item.text}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* Text input for the user to type a message */}
      <TextInput
        placeholder="Type a message"
        value={input}
        onChangeText={setInput}
      />
      {/* Button to send the message */}
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

export default Chat;
