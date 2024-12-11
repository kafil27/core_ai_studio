// screens/ChatScreen.jsx

// Import necessary libraries and components from React and React Native
import React, { useContext, useState, useRef } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatMessage from '../components/ChatMessage';
import ModelSelector from '../components/ModelSelector';
import Animated, { 
  FadeIn,
  FadeOut,
  SlideInRight,
  Layout
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const ChatScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    chatContainer: {
      flexGrow: 1,
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      backgroundColor: theme.background,
      width: '100%',
    },
    input: {
      flex: 1,
      marginRight: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: theme.inputBackground,
      color: theme.text,
      fontSize: 16,
      maxHeight: 100,
    },
    sendButton: {
      backgroundColor: '#2196F3',
      borderRadius: 20,
      padding: 10,
      transform: [{ scale: 1 }],
    },
    sendButtonDisabled: {
      backgroundColor: theme.disabled,
    },
    modelSelectorContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      width: '100%',
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 16,
      backgroundColor: theme.background,
      alignSelf: 'flex-start',
      marginVertical: 4,
      maxWidth: '80%',
    },
    loadingText: {
      color: theme.text,
      marginLeft: 8,
      fontSize: 16,
    },
    loadingDots: {
      color: theme.text,
      fontSize: 16,
    }
  });

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: `AI Response using ${selectedModel}...`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const LoadingIndicator = () => {
    const [dots, setDots] = useState('...');
    
    React.useEffect(() => {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '.' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }, []);

    return (
      <Animated.View 
        entering={FadeIn} 
        exiting={FadeOut}
        style={styles.loadingContainer}
      >
        <Icon name="chat" size={20} color={theme.text} />
        <Text style={styles.loadingText}>AI is thinking</Text>
        <Text style={styles.loadingDots}>{dots}</Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title="Chat" />
      <View style={styles.modelSelectorContainer}>
        <ModelSelector
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
        />
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <Animated.View
              entering={SlideInRight}
              layout={Layout.springify()}
            >
              <ChatMessage message={item} />
            </Animated.View>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          onLayout={() => flatListRef.current?.scrollToEnd()}
          ListFooterComponent={() => isLoading ? <LoadingIndicator /> : null}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={theme.placeholder}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled
            ]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <Icon name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
