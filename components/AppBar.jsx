import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../context/ThemeContext';

const AppBar = ({ userEmail }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
        <Icon name="menu" size={24} color={theme.text} />
      </TouchableOpacity>
      <View style={styles.emailContainer}>
        <Text style={[styles.emailText, { color: theme.text }]}>{userEmail}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Icon name="account-circle" size={24} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  emailContainer: {
    flex: 1,
    alignItems: 'center',
  },
  emailText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default AppBar; 