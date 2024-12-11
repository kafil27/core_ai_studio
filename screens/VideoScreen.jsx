// screens/VideoScreen.jsx

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
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const VideoScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [isPro, setIsPro] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('16:9');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
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
      color: isPro ? '#ffffff' : (theme.text ? '#ffffff' : '#000000'),
      textAlign: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text ? '#ffffff' : '#000000',
      marginBottom: 16,
    },
    promptContainer: {
      marginBottom: 16,
    },
    promptInput: {
      borderWidth: 1,
      borderColor: theme.text ? '#333333' : '#cccccc',
      borderRadius: 8,
      padding: 12,
      color: theme.text ? '#ffffff' : '#000000',
      backgroundColor: theme.text ? '#333333' : '#f5f5f5',
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
      color: theme.text ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    styleScroll: {
      flexDirection: 'row',
    },
    styleOption: {
      padding: 16,
      borderRadius: 8,
      marginRight: 8,
      backgroundColor: theme.text ? '#333333' : '#e0e0e0',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    styleOptionSelected: {
      borderColor: '#ff7e5f',
    },
    styleOptionText: {
      color: theme.text ? '#ffffff' : '#000000',
      marginTop: 4,
    },
    aspectRatioContainer: {
      marginVertical: 16,
    },
    aspectRatioHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    picker: {
      height: 50,
      width: '100%',
      color: theme.text ? '#ffffff' : '#000000',
      backgroundColor: theme.text ? '#333333' : '#f5f5f5',
      borderRadius: 25,
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
    uploadButton: {
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#b0bec5',
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
      flexDirection: 'row',
    },
    uploadButtonText: {
      color: theme.text ? '#ffffff' : '#000000',
      fontSize: 16,
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
      // Handle the selected image
    }
  };

  const handleGenerate = () => {
    // Placeholder for generate action
    Alert.alert('Generating...', 'Your video is being generated.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Video Generation" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={toggleProMode} style={styles.proButton}>
          <LinearGradient
            colors={isPro ? ['#ff7e5f', '#feb47b'] : ['transparent', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 8, padding: 8 }}
          >
            <Text style={styles.proButtonText}>{isPro ? 'Pro Mode' : 'Get Premium'}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.heading}>Create Video From</Text>

        <View style={styles.promptContainer}>
          <TextInput
            style={styles.promptInput}
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Enter your prompt here..."
            placeholderTextColor={theme.text ? '#888888' : '#666666'}
            multiline
            maxLength={5000}
          />
          <View style={styles.promptActions}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: prompt.length >= 5000 ? 'red' : theme.text ? '#ffffff' : '#000000' }}>
                {prompt.length}/5000
              </Text>
              {prompt.length >= 5000 && (
                <Text style={{ color: 'red', fontSize: 10, marginLeft: 4 }}>Max characters reached</Text>
              )}
              <TouchableOpacity onPress={() => setPrompt('')} style={{ marginLeft: 8 }}>
                <Icon name="highlight-off" size={20} color={theme.text ? '#ffffff' : '#000000'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
          <Icon name="image" size={24} color={theme.text ? '#ffffff' : '#000000'} />
          <Text style={styles.uploadButtonText}>Upload Image as Reference</Text>
        </TouchableOpacity>

        {isPro && (
          <>
            <View style={styles.styleContainer}>
              <Text style={styles.styleHeading}>Style (Optional)</Text>
              <ScrollView horizontal style={styles.styleScroll}>
                {['Realistic', 'Anime', 'Abstract', 'Cartoon'].map((style) => (
                  <TouchableOpacity
                    key={style}
                    style={[styles.styleOption, selectedStyle === style && styles.styleOptionSelected]}
                    onPress={() => setSelectedStyle(style)}
                  >
                    <Icon name="brush" size={24} color={theme.text ? '#ffffff' : '#000000'} />
                    <Text style={styles.styleOptionText}>{style}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.aspectRatioContainer}>
              <Text style={styles.aspectRatioHeading}>Aspect Ratio (Optional)</Text>
              <Picker
                selectedValue={aspectRatio}
                onValueChange={(itemValue) => setAspectRatio(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="16:9" value="16:9" />
                <Picker.Item label="4:3" value="4:3" />
                <Picker.Item label="1:1" value="1:1" />
                <Picker.Item label="21:9" value="21:9" />
              </Picker>
            </View>
          </>
        )}

        <TouchableOpacity onPress={handleGenerate} style={styles.generateButton}>
          <LinearGradient
            colors={['#ff7e5f', '#feb47b', '#6a11cb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.generateButton}
          >
            <Text style={styles.generateButtonText}>Create Video </Text>
            <Icon name="arrow-forward" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoScreen;
