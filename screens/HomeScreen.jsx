// screens/HomeScreen.jsx

import React, { useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, Dimensions } from 'react-native';
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

const { width } = Dimensions.get('window');

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || { username: 'User' };
  const { isDarkMode } = useContext(ThemeContext);
  const styles = HomeScreenStyles(isDarkMode);

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
    opacity: textOpacity.value,
    transform: [
      { translateY: withSpring(textOpacity.value * 10) }
    ]
  }));

  const shimmerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerPosition.value }]
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
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
          Hello, {username}! How can I help you?
        </Animated.Text>

        <View style={styles.servicesContainer}>
          <View style={styles.servicesRow}>
            <ServiceButton 
              title="Chat"
              icon="chat-bubble-outline"
              colors={['#ff7e5f', '#feb47b']}
              onPress={() => navigation.navigate('ChatScreen')}
            />
            <ServiceButton 
              title="Image"
              icon="image"
              colors={['#6a11cb', '#2575fc']}
              onPress={() => navigation.navigate('ImageScreen')}
            />
          </View>
          <View style={styles.servicesRow}>
            <ServiceButton 
              title="Video"
              icon="videocam"
              colors={['#a8ff78', '#78ffd6']}
              onPress={() => navigation.navigate('VideoScreen')}
            />
            <ServiceButton 
              title="Voice"
              icon="mic"
              colors={['#f093fb', '#f5576c']}
              onPress={() => navigation.navigate('VoiceScreen')}
            />
          </View>
        </View>

        <View style={styles.recentActivityContainer}>
          <View style={styles.recentActivityHeader}>
            <Icon name="history" size={24} color={isDarkMode ? 'white' : 'black'} />
            <Text style={styles.recentActivityTitle}>Recent Activities</Text>
          </View>
          <RecentActivity />
        </View>

        <Animated.View style={[styles.shimmer, shimmerAnimatedStyle]}>
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.3)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
