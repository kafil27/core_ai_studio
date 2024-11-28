// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import TextScreen from './screens/TextScreen';
import VideoScreen from './screens/VideoScreen';
import ChatScreen from './screens/ChatScreen';
import VoiceScreen from './screens/VoiceScreen';
import SettingsScreen from './screens/SettingsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ isDarkMode }) => (
          <>
            <StatusBar hidden={true} />
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="ImageScreen" component={ImageScreen} options={{ title: 'Image' }} />
                <Stack.Screen name="TextScreen" component={TextScreen} options={{ title: 'Text' }} />
                <Stack.Screen name="VideoScreen" component={VideoScreen} options={{ title: 'Video' }} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Chat' }} />
                <Stack.Screen name="VoiceScreen" component={VoiceScreen} options={{ title: 'Voice' }} />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
                <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ title: 'Notifications' }} />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

export default App;
