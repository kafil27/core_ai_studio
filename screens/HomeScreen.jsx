// screens/HomeScreen.jsx

import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Dimensions, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withRepeat, 
  withSequence,
  withTiming,
  Easing 
} from 'react-native-reanimated';
import ServiceButton from '../components/ServiceButton';
import RecentActivity from '../components/RecentActivity';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import AppBar from '../components/AppBar';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserData } from '../services/firestore';

const { width } = Dimensions.get('window');

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || { username: 'User' };
  const { theme } = useContext(ThemeContext);
  const styles = HomeScreenStyles(theme);

  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        getUserData(user.uid).then(setUserData);
      }
    });

    return unsubscribe;
  }, []);

  // Animation values
  const botScale = useSharedValue(0.8);
  const botFloat = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const shimmerPosition = useSharedValue(-width);

  useEffect(() => {
    // Initial animations
    botScale.value = withSpring(1, { 
      damping: 8,
      stiffness: 100
    });
    
    textOpacity.value = withTiming(1, { 
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1)
    });
    
    // Continuous floating animation
    botFloat.value = withRepeat(
      withSequence(
        withTiming(-10, { 
          duration: 1500,
          easing: Easing.bezier(0.42, 0, 0.58, 1)
        }),
        withTiming(10, { 
          duration: 1500,
          easing: Easing.bezier(0.42, 0, 0.58, 1)
        })
      ),
      -1,
      true
    );

    // Continuous shimmer effect
    const runShimmer = () => {
      shimmerPosition.value = withSequence(
        withTiming(-width, { duration: 0 }),
        withTiming(width, {
          duration: 2000,
          easing: Easing.linear,
        })
      );
    };

    // Start shimmer animation loop
    const shimmerInterval = setInterval(runShimmer, 3000);

    // Initial run
    runShimmer();

    // Cleanup
    return () => clearInterval(shimmerInterval);
  }, []);

  const botAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: botScale.value },
      { translateY: botFloat.value }
    ]
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value
  }));

  const shimmerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerPosition.value }]
  }));

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <AppBar userData={userData} />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.botContainer}>
          <Animated.Image 
            source={require('../assets/bot-vector.png')} 
            style={[styles.botImage, botAnimatedStyle]} 
          />
        </View>

        <Animated.Text style={[styles.greetingText, textAnimatedStyle, { color: theme.text }]}>
          Hello, {userData?.name || username}! How can I help you?
        </Animated.Text>

        {userEmail ? (
          <View style={styles.emailContainer}>
            <Text style={[styles.emailText, { color: theme.text }]}>{userEmail}</Text>
          </View>
        ) : null}

        <View style={styles.servicesContainer}>
          <View style={styles.servicesRow}>
            <ServiceButton 
              title="Chat"
              icon="chat-bubble-outline"
              colors={['#ff7e5f', '#feb47b']}
              onPress={() => handleNavigation('ChatScreen')}
            />
            <ServiceButton 
              title="Image"
              icon="image"
              colors={['#6a11cb', '#2575fc']}
              onPress={() => handleNavigation('ImageScreen')}
            />
          </View>
          <View style={styles.servicesRow}>
            <ServiceButton 
              title="Video"
              icon="videocam"
              colors={['#a8ff78', '#78ffd6']}
              onPress={() => handleNavigation('VideoScreen')}
            />
            <ServiceButton 
              title="Voice"
              icon="mic"
              colors={['#f093fb', '#f5576c']}
              onPress={() => handleNavigation('VoiceScreen')}
            />
          </View>
        </View>

        <View style={styles.recentActivityContainer}>
          <View style={styles.recentActivityHeader}>
            <Icon name="history" size={24} color={theme.text} />
            <Text style={[styles.recentActivityTitle, { color: theme.text }]}>Recent Activities</Text>
          </View>
          <RecentActivity />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emailContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  emailText: {
    fontSize: 16,
    color: '#000',
  },
});

export default HomeScreen;
