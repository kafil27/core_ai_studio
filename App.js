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
import ProfileScreen from './screens/ProfileScreen';

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
                  animationEnabled: false,
                  cardStyleInterpolator: undefined,
                  transitionSpec: {
                    open: { animation: 'timing', config: { duration: 0 } },
                    close: { animation: 'timing', config: { duration: 0 } },
                  },
                }}
              >
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                />
                <Stack.Screen name="ImageScreen" component={ImageScreen} />
                <Stack.Screen name="TextScreen" component={TextScreen} />
                <Stack.Screen name="VideoScreen" component={VideoScreen} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
                <Stack.Screen name="VoiceScreen" component={VoiceScreen} />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
                <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

export default App;
