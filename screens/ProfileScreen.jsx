import React, { useContext, useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert, 
  TextInput,
  ScrollView
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from '../components/CustomHeader';

const ProfileScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [tokens, setTokens] = useState(100); // Example token count
  const [apiKey, setApiKey] = useState('');
  const [isEditingApiKey, setIsEditingApiKey] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
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
      color: isDarkMode ? '#ffffff' : '#000000',
      marginVertical: 10,
    },
    email: {
      fontSize: 16,
      color: isDarkMode ? '#cccccc' : '#666666',
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
      backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
    },
    sectionHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 10,
    },
    tokenText: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    apiInput: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#555555' : '#cccccc',
      borderRadius: 8,
      padding: 10,
      color: isDarkMode ? '#ffffff' : '#000000',
      backgroundColor: isDarkMode ? '#444444' : '#ffffff',
      marginTop: 10,
    },
  });

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing is not implemented yet.');
  };

  const handleBuyTokens = () => {
    Alert.alert('Buy Tokens', 'Token purchasing is not implemented yet.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="account-circle" size={80} color={isDarkMode ? '#ffffff' : '#000000'} />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>

        <TouchableOpacity onPress={handleEditProfile} style={styles.button}>
          <LinearGradient
            colors={['#6a11cb', '#2575fc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Icon name="edit" size={24} color="#ffffff" />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Tokens</Text>
          <Text style={styles.tokenText}>Available Tokens: {tokens}</Text>
          <TouchableOpacity onPress={handleBuyTokens} style={[styles.button, { marginTop: 10 }]}>
            <LinearGradient
              colors={['#ff7e5f', '#feb47b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Icon name="add-circle-outline" size={24} color="#ffffff" />
              <Text style={styles.buttonText}>Buy More Tokens</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Custom AI API</Text>
          <TextInput
            style={styles.apiInput}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your custom API key"
            placeholderTextColor={isDarkMode ? '#888888' : '#666666'}
            editable={isEditingApiKey}
          />
          <TouchableOpacity onPress={() => setIsEditingApiKey(!isEditingApiKey)} style={[styles.button, { marginTop: 10 }]}>
            <LinearGradient
              colors={['#43cea2', '#185a9d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Icon name={isEditingApiKey ? "save" : "edit"} size={24} color="#ffffff" />
              <Text style={styles.buttonText}>{isEditingApiKey ? "Save API Key" : "Edit API Key"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen; 