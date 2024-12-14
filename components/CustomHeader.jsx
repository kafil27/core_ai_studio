import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomHeader = ({ title, isHomeScreen = false, showEditButton = false, isEditing, setIsEditing }) => {
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
      {showEditButton && (
        <TouchableOpacity
          style={[styles.editButton, { borderColor: isEditing ? '#4caf50' : '#ccc', borderWidth: 1 }]}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Icon name="edit" size={24} color={theme.text} />
        </TouchableOpacity>
      )}
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
  editButton: {
    borderRadius: 20,
    padding: 8,
  },
});

export default CustomHeader; 