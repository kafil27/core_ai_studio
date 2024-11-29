// screens/SettingsScreen.jsx

import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
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
      borderBottomColor: isDarkMode ? '#333333' : '#e0e0e0',
    },
    settingText: {
      fontSize: 18,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    icon: {
      color: isDarkMode ? '#ffffff' : '#000000',
      marginRight: 16,
    },
    toggle: {
      transform: [{ scale: 1.2 }],
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.settingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="brightness-6" size={24} style={styles.icon} />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDarkMode}
            style={styles.toggle}
          />
        </Animated.View>

        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.settingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="notifications" size={24} style={styles.icon} />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isNotificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
            value={isNotificationsEnabled}
            style={styles.toggle}
          />
        </Animated.View>

        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.settingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="volume-up" size={24} style={styles.icon} />
            <Text style={styles.settingText}>Sound</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isSoundEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsSoundEnabled(!isSoundEnabled)}
            value={isSoundEnabled}
            style={styles.toggle}
          />
        </Animated.View>

        {/* Add more settings options as needed */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
