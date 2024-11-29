// screens/ImageScreen.jsx

import React, { useContext, useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
  Alert
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const ImageScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isPro, setIsPro] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [image, setImage] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    },
    contentContainer: {
      padding: 16,
    },
    proButton: {
      alignSelf: 'flex-end',
      padding: 8,
      borderRadius: 8,
      marginBottom: 16,
      borderWidth: isPro ? 0 : 2,
      borderColor: isPro ? 'transparent' : '#ff7e5f',
    },
    proButtonText: {
      color: isPro ? '#ffffff' : (isDarkMode ? '#ffffff' : '#000000'),
      textAlign: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 16,
    },
    promptContainer: {
      marginBottom: 16,
    },
    promptInput: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#333333' : '#cccccc',
      borderRadius: 8,
      padding: 12,
      color: isDarkMode ? '#ffffff' : '#000000',
      backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
      maxHeight: 100,
    },
    promptActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
      marginVertical: 8,
      flex: 1,
      justifyContent: 'center',
    },
    actionButtonText: {
      color: '#ffffff',
      marginLeft: 4,
    },
    styleContainer: {
      marginVertical: 16,
    },
    styleHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    styleScroll: {
      flexDirection: 'row',
    },
    styleOption: {
      padding: 16,
      borderRadius: 8,
      marginRight: 8,
      backgroundColor: isDarkMode ? '#333333' : '#e0e0e0',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    styleOptionSelected: {
      borderColor: '#ff7e5f',
    },
    styleOptionText: {
      color: isDarkMode ? '#ffffff' : '#000000',
      marginTop: 4,
    },
    generateButton: {
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 24,
      flexDirection: 'row',
      width: '100%',
    },
    generateButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 8,
    },
  });

  const toggleProMode = () => {
    setIsPro(!isPro);
  };

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need permission to access your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleGenerate = () => {
    // Placeholder for generate action
    Alert.alert('Generating...', 'Your image is being generated.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Image Generation" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={toggleProMode} style={styles.proButton}>
          <LinearGradient
            colors={isPro ? ['#ff7e5f', '#feb47b'] : ['transparent', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 8, padding: 8 }}
          >
            <Text style={styles.proButtonText}>Pro Mode</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.heading}>Create Artwork From</Text>

        <View style={styles.promptContainer}>
          <TextInput
            style={styles.promptInput}
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Enter your prompt here..."
            placeholderTextColor={isDarkMode ? '#888888' : '#666666'}
            multiline
            maxLength={4000}
          />
          <View style={styles.promptActions}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: prompt.length >= 4000 ? 'red' : isDarkMode ? '#ffffff' : '#000000' }}>
                {prompt.length}/4000
              </Text>
              {prompt.length >= 4000 && (
                <Text style={{ color: 'red', fontSize: 10, marginLeft: 4 }}>Max characters reached</Text>
              )}
              <TouchableOpacity onPress={() => setPrompt('')} style={{ marginLeft: 8 }}>
                <Icon name="highlight-off" size={20} color={isDarkMode ? '#ffffff' : '#000000'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <TouchableOpacity style={styles.actionButton} onPress={handleImageUpload}>
              <LinearGradient
                colors={['#43cea2', '#185a9d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ borderRadius: 8, padding: 8, flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 4 }}
              >
                <Icon name="image" size={20} color="#ffffff" />
                <Text style={styles.actionButtonText}>Upload</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setPrompt('Random AI-generated prompt')}>
              <LinearGradient
                colors={['#6a11cb', '#2575fc']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ borderRadius: 8, padding: 8, flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 4 }}
              >
                <Icon name="star" size={20} color="#ffffff" />
                <Text style={styles.actionButtonText}>Surprise Me</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {isPro && (
          <View style={styles.styleContainer}>
            <Text style={styles.styleHeading}>Style (Optional)</Text>
            <ScrollView horizontal style={styles.styleScroll}>
              {['Realistic', 'Anime', 'Abstract', 'Cartoon'].map((style) => (
                <TouchableOpacity
                  key={style}
                  style={[styles.styleOption, selectedStyle === style && styles.styleOptionSelected]}
                  onPress={() => setSelectedStyle(style)}
                >
                  <Icon name="brush" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
                  <Text style={styles.styleOptionText}>{style}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TouchableOpacity onPress={handleGenerate} style={styles.generateButton}>
          <LinearGradient
            colors={['#6a11cb', '#2575fc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.generateButton}
          >

            <Text style={styles.generateButtonText}>Create </Text>
            <Icon name="arrow-forward" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImageScreen;
