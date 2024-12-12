// App.js

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
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
import { StatusBar } from 'react-native';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={{ colors: { background: theme.background } }}>
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
  );
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StatusBar hidden={true} />
      <AppContent />
    </PersistGate>
  </Provider>
);

export default App;
