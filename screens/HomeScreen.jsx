// screens/HomeScreen.jsx

import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || { username: 'User' }; // Default to 'User' if username is not provided
  const { isDarkMode } = useContext(ThemeContext);
  const styles = HomeScreenStyles(isDarkMode); // Get styles based on theme

  // Animation setup
  const bounceValue = useSharedValue(0);

  useEffect(() => {
    bounceValue.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bounce,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bounceValue.value * -20 }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Ionicons name="settings" size={24} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://example.com/user-profile.png' }} // Replace with actual profile image URL
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen')}>
          <Ionicons name="notifications" size={24} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Animated.Image source={require('../assets/bot-vector.png')} style={[styles.botImage, animatedStyle]} />
        <Text style={styles.greetingText}>
          Hello, {username}! How can I help you?
        </Text>
        <View style={styles.servicesContainer}>
          <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('ChatScreen')}>
            <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.gradient}>
              <Text style={styles.serviceText}>Chat</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('ImageScreen')}>
            <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradient}>
              <Text style={styles.serviceText}>Image</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('VideoScreen')}>
            <LinearGradient colors={['#a8ff78', '#78ffd6']} style={styles.gradient}>
              <Text style={styles.serviceText}>Video</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('VoiceScreen')}>
            <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.gradient}>
              <Text style={styles.serviceText}>Voice (Beta)</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
