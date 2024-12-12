// screens/HomeScreen.jsx

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
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
import AppBar from '../components/AppBar';
import { auth, getUserData } from '../services/firebase';

const { width } = Dimensions.get('window');

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || { username: 'User' };
  const { theme } = useSelector((state) => state.theme);
  const styles = HomeScreenStyles(theme);

  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const data = await getUserData(user.uid);
          if (data) {
            setUserData(data);
            setUserEmail(user.email);
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
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
    <SafeAreaView style={styles.container}>
      <AppBar userData={userData} userEmail={userEmail} />
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

        <Animated.Text style={[styles.greetingText, textAnimatedStyle]}>
          Hello, {userData?.name || username}! How can I help you?
        </Animated.Text>

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
            <Text style={styles.recentActivityTitle}>Recent Activities</Text>
          </View>
          <RecentActivity />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
