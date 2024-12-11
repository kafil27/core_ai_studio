import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert, Image } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from '../components/CustomHeader';
import { getUserData, updateUserData } from '../services/firestore';
import { auth } from '../services/firebase';

const ProfileScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [userData, setUserData] = useState(null);
  const [tokens, setTokens] = useState(100); // Example token count
  const [apiKey, setApiKey] = useState('');
  const [isEditingApiKey, setIsEditingApiKey] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getUserData(user.uid).then(setUserData);
    }
  }, []);

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing is not implemented yet.');
  };

  const handleBuyTokens = () => {
    Alert.alert('Buy Tokens', 'Token purchasing is not implemented yet.');
  };

  const handleSaveApiKey = async () => {
    try {
      await updateUserData(auth.currentUser.uid, { apiKey });
      Alert.alert('Success', 'API Key updated successfully');
      setIsEditingApiKey(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title="Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            {userData?.profilePicture ? (
              <Image source={{ uri: userData.profilePicture }} style={styles.avatar} />
            ) : (
              <Icon name="account-circle" size={80} color={theme.text} />
            )}
          </View>
          <Text style={[styles.name, { color: theme.text }]}>{userData?.name || 'User'}</Text>
          <Text style={[styles.email, { color: theme.placeholderText }]}>{userData?.email}</Text>
        </View>

        <TouchableOpacity onPress={handleEditProfile} style={styles.button}>
          <LinearGradient
            colors={['#6a11cb', '#2575fc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Icon name="edit" size={24} color={theme.buttonText} />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Tokens</Text>
          <Text style={[styles.tokenText, { color: theme.text }]}>Available Tokens: {tokens}</Text>
          <TouchableOpacity onPress={handleBuyTokens} style={[styles.button, { marginTop: 10 }]}>
            <LinearGradient
              colors={['#ff7e5f', '#feb47b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Icon name="add-circle-outline" size={24} color={theme.buttonText} />
              <Text style={styles.buttonText}>Buy More Tokens</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Custom AI API</Text>
          <TextInput
            style={[styles.apiInput, { borderColor: theme.border, color: theme.text, backgroundColor: theme.background }]}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your custom API key"
            placeholderTextColor={theme.placeholderText}
            editable={isEditingApiKey}
          />
          <TouchableOpacity onPress={() => setIsEditingApiKey(!isEditingApiKey)} style={[styles.button, { marginTop: 10 }]}>
            <LinearGradient
              colors={['#43cea2', '#185a9d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Icon name={isEditingApiKey ? "save" : "edit"} size={24} color={theme.buttonText} />
              <Text style={styles.buttonText}>{isEditingApiKey ? "Save API Key" : "Edit API Key"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  email: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    marginVertical: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tokenText: {
    fontSize: 16,
  },
  apiInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
});

export default ProfileScreen; 