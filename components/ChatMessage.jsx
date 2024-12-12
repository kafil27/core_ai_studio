import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ChatMessage = ({ message }) => {
  const { theme } = useSelector((state) => state.theme);

  const styles = StyleSheet.create({
    container: {
      marginVertical: 4,
      maxWidth: '80%',
      alignSelf: message.isUser ? 'flex-end' : 'flex-start',
    },
    bubble: {
      backgroundColor: message.isUser 
        ? (theme === 'dark' ? '#2196F3' : '#1976D2')
        : (theme === 'dark' ? '#333333' : '#f0f0f0'),
      padding: 12,
      borderRadius: 16,
      borderTopLeftRadius: message.isUser ? 16 : 4,
      borderTopRightRadius: message.isUser ? 4 : 16,
    },
    text: {
      color: message.isUser 
        ? '#ffffff'
        : theme.text,
      fontSize: 16,
    },
    timestamp: {
      fontSize: 12,
      color: theme.placeholderText,
      marginTop: 4,
      alignSelf: message.isUser ? 'flex-end' : 'flex-start',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{message.text}</Text>
      </View>
      <Text style={styles.timestamp}>
        {new Date(message.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </Text>
    </View>
  );
};

export default ChatMessage; 