import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../context/ThemeContext';

const AppBar = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    },
    icon: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
        <Icon name="menu" size={24} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Icon name="account-circle" size={24} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default AppBar; 