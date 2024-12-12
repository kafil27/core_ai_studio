import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import CustomHeader from '../components/CustomHeader';
import { auth, getUserData, updateUserName } from '../services/firebase';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const ProfileScreen = () => {
  const { theme } = useSelector((state) => state.theme);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const data = await getUserData(user.uid);
          if (data) {
            setUserData(data);
            setNewName(data.name);
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditName = async () => {
    try {
      await updateUserName(auth.currentUser.uid, newName);
      setUserData({ ...userData, name: newName });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user name: ", error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return isNaN(date) ? 'N/A' : date.toLocaleDateString();
  };

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert("Permission to access gallery is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      // Here you would upload the image to your server or Firebase storage
      // and update the user's profile picture URL in the database
      console.log("Selected image URI: ", pickerResult.uri);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title="Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        <LinearGradient
          colors={theme.background === '#000000' ? ['#333', '#555'] : ['#fff', '#ddd']}
          style={styles.profilePictureContainer}
        >
          {userData?.profilePicture ? (
            <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
          ) : (
            <Icon name="account-circle" size={140} color={theme.text} />
          )}
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <Icon name="camera-alt" size={24} color={theme.text} />
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icon name="person" size={24} color={theme.text} />
            {isEditing ? (
              <TextInput
                style={[styles.infoText, { color: theme.text }]}
                value={newName}
                onChangeText={setNewName}
                onBlur={handleEditName}
              />
            ) : (
              <Text style={[styles.infoText, { color: theme.text }]}>{userData?.name || 'User'}</Text>
            )}
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Icon name="edit" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.infoItem}>
            <Icon name="email" size={24} color={theme.text} />
            <Text style={[styles.infoText, { color: theme.text }]}>{userData?.email || 'user@example.com'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="calendar-today" size={24} color={theme.text} />
            <Text style={[styles.infoText, { color: theme.text }]}>
              {userData?.signUpDate ? formatDate(userData.signUpDate) : 'N/A'}
            </Text>
          </View>
        </View>
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.tokensContainer}>
          <LinearGradient
            colors={theme.background === '#000000' ? ['#555', '#777'] : ['#ddd', '#fff']}
            style={styles.tokensBackground}
          >
            <View style={styles.tokensInfo}>
              <Icon name="star" size={24} color={theme.text} />
              <Text style={[styles.tokensText, { color: theme.text }]}>
                {userData?.tokens || 0} Tokens
              </Text>
            </View>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Tokens</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    padding: 16,
  },
  profilePictureContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 4,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  tokensContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  tokensBackground: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  tokensInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tokensText: {
    fontSize: 18,
    marginLeft: 10,
  },
  buyButton: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen; 