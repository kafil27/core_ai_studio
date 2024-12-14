import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, Alert, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import CustomHeader from '../components/CustomHeader';
import { auth, getUserData, updateUserName } from '../services/firebase';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import RazorpayCheckout from 'react-native-razorpay';

const ProfileScreen = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const data = await getUserData(user.uid);
          if (data) {
            setUserData(data);
            setNewName(data.name);
            setOriginalName(data.name);
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditName = async () => {
    if (newName !== originalName) {
      try {
        await updateUserName(auth.currentUser.uid, newName);
        setUserData({ ...userData, name: newName });
        setOriginalName(newName);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating user name: ", error);
      }
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

  const handleBuyTokens = (amountUSD, tokens) => {
    // Convert USD to INR using a live conversion API
    const conversionRate = 75; // Example conversion rate, replace with live API call
    const amountINR = amountUSD * conversionRate * 100; // Razorpay expects amount in paise

    const options = {
      description: `Purchase ${tokens} tokens`,
      image: 'https://your-logo-url.com/logo.png',
      currency: 'INR',
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
      amount: amountINR,
      name: 'Your App Name',
      prefill: {
        email: userData?.email,
        contact: '1234567890', // Replace with user's contact number
        name: userData?.name,
      },
      theme: { color: theme.background === '#000000' ? '#1e3c72' : '#6a11cb' },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // Handle successful payment
        console.log(`Success: ${data.razorpay_payment_id}`);
        // Update user's token balance
        // dispatch(updateTokenBalance(userData.uid, tokens));
        Alert.alert('Success', `You have purchased ${tokens} tokens.`);
      })
      .catch((error) => {
        // Handle payment failure
        console.error(`Error: ${error.code} | ${error.description}`);
        Alert.alert('Payment Failed', 'Please try again.');
      });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title="Profile" showEditButton={true} isEditing={isEditing} setIsEditing={setIsEditing} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profilePictureContainer}>
          <LinearGradient
            colors={theme.background === '#000000' ? ['#333', '#555'] : ['#fff', '#ddd']}
            style={styles.profilePictureBackground}
          >
            {userData?.profilePicture ? (
              <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
            ) : (
              <Icon name="account-circle" size={140} color={theme.text} />
            )}
          </LinearGradient>
          {isEditing && (
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <Icon name="camera" size={28} color={theme.text} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icon name="account" size={24} color={theme.text} />
            {isEditing ? (
              <TextInput
                style={[
                  styles.infoText,
                  { color: theme.text },
                  newName !== originalName && styles.activeInput,
                  isFocused && styles.focusedInput
                ]}
                value={newName}
                onChangeText={setNewName}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            ) : (
              <Text style={[styles.infoText, { color: theme.text }]}>{userData?.name || 'User'}</Text>
            )}
            {isEditing && newName !== originalName && (
              <TouchableOpacity onPress={handleEditName}>
                <Icon name="check" size={20} color={theme.text} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.infoItem}>
            <Icon name="email" size={24} color={theme.text} />
            <Text style={[styles.infoText, { color: theme.text }]}>{userData?.email || 'user@example.com'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="calendar" size={24} color={theme.text} />
            <Text style={[styles.infoText, { color: theme.text }]}>
              {userData?.signUpDate ? formatDate(userData.signUpDate) : 'N/A'}
            </Text>
          </View>
        </View>
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.tokensContainer}>
          <LinearGradient
            colors={theme.background === '#000000' ? ['#1e3c72', '#2a5298'] : ['#6a11cb', '#2575fc']}
            style={styles.tokensBackground}
          >
            <View style={styles.tokensInfo}>
              <Icon name="cash-multiple" size={24} color={theme.text} />
              <Text style={[styles.tokensText, { color: theme.text }]}>
                {userData?.tokens || 0} Tokens
              </Text>
            </View>
            <TouchableOpacity style={styles.buyButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.buyButtonText}>Buy Tokens</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Buy Tokens</Text>
            <TouchableOpacity style={styles.tokenOption} onPress={() => handleBuyTokens(10, 100)}>
              <Text style={[styles.tokenOptionText, { color: theme.text }]}>100 Tokens - $10 USD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tokenOption} onPress={() => handleBuyTokens(20, 200)}>
              <Text style={[styles.tokenOptionText, { color: theme.text }]}>200 Tokens - $20 USD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tokenOption} onPress={() => handleBuyTokens(40, 500)}>
              <Text style={[styles.tokenOptionText, { color: theme.text }]}>500 Tokens - $40 USD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    position: 'relative',
    marginBottom: 20,
  },
  profilePictureBackground: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  editIcon: {
    position: 'absolute',
    bottom: -5,
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
  activeInput: {
    borderColor: '#4caf50',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#e0f7fa',
  },
  focusedInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tokenOption: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    width: '100%',
    alignItems: 'center',
  },
  tokenOptionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen; 