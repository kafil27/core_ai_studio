import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomHeader = ({ title, isHomeScreen = false }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    header: {
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    iconContainer: {
      marginRight: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : 'black',
      flex: 1,
    }
  });

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.iconContainer}
        onPress={() => isHomeScreen ? null : navigation.navigate('HomeScreen')}
      >
        <Icon 
          name={isHomeScreen ? "home" : "arrow-back"} 
          size={24} 
          color={isDarkMode ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomHeader; 