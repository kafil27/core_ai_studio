// App.jsx

// Import necessary libraries from React and React Native
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';

// Import the screens
import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import TextScreen from './screens/TextScreen';
import VideoScreen from './screens/VideoScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator(); // Create a stack navigator

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        {/* Define routes for each screen */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
        <Stack.Screen name="TextScreen" component={TextScreen} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent('main', () => App);

export default App;
