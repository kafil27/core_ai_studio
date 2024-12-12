// screens/SettingsScreen.jsx

import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Vibration } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleNotifications, toggleSound } from '../reducers/settingsReducer';
import { setTheme } from '../reducers/themeReducer';
import CustomHeader from '../components/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { lightTheme, darkTheme } from '../context/themes';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { notificationsEnabled, soundEnabled } = useSelector((state) => state.settings);
  const { theme } = useSelector((state) => state.theme);

  const themeTogglePosition = useSharedValue(theme === darkTheme ? 1 : 0);
  const notificationTogglePosition = useSharedValue(notificationsEnabled ? 1 : 0);
  const soundTogglePosition = useSharedValue(soundEnabled ? 1 : 0);

  const handleThemeToggle = () => {
    const newTheme = theme === darkTheme ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    themeTogglePosition.value = withSpring(newTheme === 'dark' ? 1 : 0);
    Vibration.vibrate(50);
  };

  const handleNotificationToggle = () => {
    dispatch(toggleNotifications());
    notificationTogglePosition.value = withSpring(notificationsEnabled ? 0 : 1);
    Vibration.vibrate(50);
  };

  const handleSoundToggle = () => {
    dispatch(toggleSound());
    soundTogglePosition.value = withSpring(soundEnabled ? 0 : 1);
    Vibration.vibrate(50);
  };

  const themeToggleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: themeTogglePosition.value * 24 }],
  }));

  const notificationToggleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: notificationTogglePosition.value * 24 }],
  }));

  const soundToggleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: soundTogglePosition.value * 24 }],
  }));

  const toggleBackgroundStyle = (enabled) => ({
    backgroundColor: enabled ? '#4caf50' : '#ccc',
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title="Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: theme.text }]}>Theme</Text>
          <View style={styles.toggleContainer}>
            <Icon name="wb-sunny" size={20} color={theme === lightTheme ? theme.text : 'gray'} />
            <TouchableOpacity onPress={handleThemeToggle} style={[styles.toggleBackground, toggleBackgroundStyle(theme === darkTheme)]}>
              <Animated.View style={[styles.toggleCircle, themeToggleStyle]} />
            </TouchableOpacity>
            <Icon name="nights-stay" size={22} color={theme === darkTheme ? theme.text : 'gray'} />
          </View>
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: theme.text }]}>Notifications</Text>
          <View style={styles.toggleContainer}>
            <Icon name="notifications-off" size={20} color={notificationsEnabled ? 'gray' : theme.text} />
            <TouchableOpacity onPress={handleNotificationToggle} style={[styles.toggleBackground, toggleBackgroundStyle(notificationsEnabled)]}>
              <Animated.View style={[styles.toggleCircle, notificationToggleStyle]} />
            </TouchableOpacity>
            <Icon name="notifications" size={22} color={notificationsEnabled ? theme.text : 'gray'} />
          </View>
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: theme.text }]}>Sound</Text>
          <View style={styles.toggleContainer}>
            <Icon name="volume-off" size={20} color={soundEnabled ? 'gray' : theme.text} />
            <TouchableOpacity onPress={handleSoundToggle} style={[styles.toggleBackground, toggleBackgroundStyle(soundEnabled)]}>
              <Animated.View style={[styles.toggleCircle, soundToggleStyle]} />
            </TouchableOpacity>
            <Icon name="volume-up" size={22} color={soundEnabled ? theme.text : 'gray'} />
          </View>
        </View>
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
    borderBottomWidth: 0.2
    ,
    borderBottomColor: '#e0e0e0',
  },
  settingText: {
    fontSize: 20,
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  toggleBackground: {
    width: 50,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
  },
});

export default SettingsScreen;
