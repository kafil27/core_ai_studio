// screens/HomeScreen.jsx

// Import necessary libraries from React and React Native
import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation(); // Hook to access the navigation object

  return (
    <View>
      {/* Buttons to navigate to different screens */}
      <Button title="Generate Image" onPress={() => navigation.navigate('ImageScreen')} />
      <Button title="Generate Text" onPress={() => navigation.navigate('TextScreen')} />
      <Button title="Generate Video" onPress={() => navigation.navigate('VideoScreen')} />
      <Button title="Chat" onPress={() => navigation.navigate('ChatScreen')} />
    </View>
  );
};

export default HomeScreen;
