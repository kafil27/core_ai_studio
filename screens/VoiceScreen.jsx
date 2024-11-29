// screens/VoiceScreen.jsx

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

const { width } = Dimensions.get('window');

const VoiceScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [playingVoice, setPlayingVoice] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    },
    contentContainer: {
      padding: 16,
    },
    advancedButton: {
      alignSelf: 'flex-end',
      padding: 8,
      borderRadius: 8,
      marginBottom: 16,
      borderWidth: isAdvanced ? 0 : 2,
      borderColor: isAdvanced ? 'transparent' : '#ff7e5f',
    },
    advancedButtonText: {
      color: isAdvanced ? '#ffffff' : (isDarkMode ? '#ffffff' : '#000000'),
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
    voiceContainer: {
      marginVertical: 16,
    },
    voiceHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    voiceScroll: {
      flexDirection: 'row',
    },
    voiceOption: {
      padding: 16,
      borderRadius: 8,
      marginRight: 8,
      backgroundColor: isDarkMode ? '#333333' : '#e0e0e0',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
      flexDirection: 'row',
    },
    voiceOptionSelected: {
      borderColor: '#ff7e5f',
    },
    voiceOptionText: {
      color: isDarkMode ? '#ffffff' : '#000000',
      marginLeft: 8,
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
      marginRight: 8,
    },
  });

  const toggleAdvancedMode = () => {
    setIsAdvanced(!isAdvanced);
  };

  const handleGenerate = () => {
    // Placeholder for generate action
    Alert.alert('Generating...', 'Your voice is being generated.');
  };

  const handlePlayVoice = (voice) => {
    if (playingVoice === voice) {
      setPlayingVoice(null); // Stop playing
    } else {
      setPlayingVoice(voice); // Start playing
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Voice Generation" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={toggleAdvancedMode} style={styles.advancedButton}>
          <LinearGradient
            colors={isAdvanced ? ['#ff7e5f', '#feb47b'] : ['transparent', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 8, padding: 8 }}
          >
            <Text style={styles.advancedButtonText}>{isAdvanced ? 'Advanced' : 'Advance Mode'}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.heading}>Create Voice From</Text>

        <View style={styles.promptContainer}>
          <TextInput
            style={styles.promptInput}
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Enter your prompt here..."
            placeholderTextColor={isDarkMode ? '#888888' : '#666666'}
            multiline
            maxLength={6000}
          />
          <View style={styles.promptActions}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: prompt.length >= 6000 ? 'red' : isDarkMode ? '#ffffff' : '#000000' }}>
                {prompt.length}/6000
              </Text>
              {prompt.length >= 6000 && (
                <Text style={{ color: 'red', fontSize: 10, marginLeft: 4 }}>Max characters reached</Text>
              )}
              <TouchableOpacity onPress={() => setPrompt('')} style={{ marginLeft: 8 }}>
                <Icon name="highlight-off" size={20} color={isDarkMode ? '#ffffff' : '#000000'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {isAdvanced && (
          <View style={styles.voiceContainer}>
            <Text style={styles.voiceHeading}>Advanced Options (Voices)</Text>
            <ScrollView horizontal style={styles.voiceScroll}>
              {['Voice 1', 'Voice 2', 'Voice 3', 'Voice 4', 'Voice 5'].map((voice) => (
                <TouchableOpacity
                  key={voice}
                  style={[styles.voiceOption, selectedVoice === voice && styles.voiceOptionSelected]}
                  onPress={() => setSelectedVoice(voice)}
                >
                  <Icon 
                    name={playingVoice === voice ? "pause" : "play-arrow"} 
                    size={24} 
                    color={isDarkMode ? '#ffffff' : '#000000'} 
                    onPress={() => handlePlayVoice(voice)}
                  />
                  <Text style={styles.voiceOptionText}>{voice}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TouchableOpacity onPress={handleGenerate} style={styles.generateButton}>
          <LinearGradient
            colors={['#ff7e5f', '#feb47b', '#6a11cb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.generateButton}
          >
            <Icon name="graphic-eq" size={24} color="#ffffff" />
            <Text style={styles.generateButtonText}>Create Voice</Text>
            <Icon name="arrow-forward" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VoiceScreen;
