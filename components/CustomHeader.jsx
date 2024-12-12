import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomHeader = ({ title, isHomeScreen = false }) => {
  const { theme } = useSelector((state) => state.theme);
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <TouchableOpacity 
        style={styles.iconContainer}
        onPress={() => isHomeScreen ? null : navigation.goBack()}
      >
        <Icon 
          name={isHomeScreen ? "home" : "arrow-back"} 
          size={24} 
          color={theme.text}
        />
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
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
    flex: 1,
  },
});

export default CustomHeader; 