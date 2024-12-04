// App.js

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import VideoScreen from './screens/VideoScreen';
import ChatScreen from './screens/ChatScreen';
import VoiceScreen from './screens/VoiceScreen';
import SettingsScreen from './screens/SettingsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { StatusBar } from 'react-native';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ isDarkMode }) => (
          <>
            <StatusBar hidden={true} />
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="SignInScreen"
                screenOptions={{
                  headerShown: false,
                }}
              >
                {isAuthenticated ? (
                  <>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="ImageScreen" component={ImageScreen} />
                    <Stack.Screen name="VideoScreen" component={VideoScreen} />
                    <Stack.Screen name="ChatScreen" component={ChatScreen} />
                    <Stack.Screen name="VoiceScreen" component={VoiceScreen} />
                    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
                    <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="SignInScreen" component={SignInScreen} />
                    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

export default App;
