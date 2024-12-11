import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem('appSettings');
        if (storedSettings) {
          const settings = JSON.parse(storedSettings);
          setIsDarkMode(settings.isDarkMode);
          setIsNotificationsEnabled(settings.isNotificationsEnabled);
          setIsSoundEnabled(settings.isSoundEnabled);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('appSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    saveSettings({ isDarkMode: newDarkMode, isNotificationsEnabled, isSoundEnabled });
  };

  const toggleNotifications = () => {
    const newNotifications = !isNotificationsEnabled;
    setIsNotificationsEnabled(newNotifications);
    saveSettings({ isDarkMode, isNotificationsEnabled: newNotifications, isSoundEnabled });
  };

  const toggleSound = () => {
    const newSound = !isSoundEnabled;
    setIsSoundEnabled(newSound);
    saveSettings({ isDarkMode, isNotificationsEnabled, isSoundEnabled: newSound });
  };

  return (
    <SettingsContext.Provider value={{ isDarkMode, toggleDarkMode, isNotificationsEnabled, toggleNotifications, isSoundEnabled, toggleSound }}>
      {children}
    </SettingsContext.Provider>
  );
}; 