// screens/SettingsScreen.jsx

import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { darkTheme } from '../context/themes';
import CustomHeader from '../components/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem('appSettings');
        if (storedSettings) {
          const settings = JSON.parse(storedSettings);
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

  const handleToggleNotifications = () => {
    const newValue = !isNotificationsEnabled;
    setIsNotificationsEnabled(newValue);
    saveSettings({ isNotificationsEnabled: newValue, isSoundEnabled });
  };

  const handleToggleSound = () => {
    const newValue = !isSoundEnabled;
    setIsSoundEnabled(newValue);
    saveSettings({ isNotificationsEnabled, isSoundEnabled: newValue });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title="Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.settingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="brightness-6" size={24} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Dark Mode</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={theme === darkTheme ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={theme === darkTheme}
            style={styles.toggle}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="notifications" size={24} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Notifications</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isNotificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleToggleNotifications}
            value={isNotificationsEnabled}
            style={styles.toggle}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="volume-up" size={24} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Sound</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isSoundEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleToggleSound}
            value={isSoundEnabled}
            style={styles.toggle}
          />
        </View>

        {/* Add more settings options as needed */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingText: {
    fontSize: 18,
    marginLeft: 10,
  },
  toggle: {
    transform: [{ scale: 1.2 }],
  },
});

export default SettingsScreen;
