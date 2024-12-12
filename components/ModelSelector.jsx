import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Menu, MenuItem } from 'react-native-material-menu';
import { useSelector } from 'react-redux';

const ModelSelector = ({ selectedModel, onSelectModel }) => {
  const [visible, setVisible] = useState(false);
  const { theme } = useSelector((state) => state.theme);

  const models = [
    { id: 'gpt-3.5-turbo', name: 'ChatGPT 3.5' },
    { id: 'gpt-4', name: 'ChatGPT 4' },
    { id: 'gemini-pro', name: 'Gemini Pro' },
  ];

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
      backgroundColor: theme.background,
    },
    buttonText: {
      color: theme.text,
      marginRight: 8,
      fontSize: 14,
    },
    menu: {
      backgroundColor: theme.background,
    },
    menuItem: {
      color: theme.text,
    },
  });

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        anchor={
          <TouchableOpacity
            style={styles.button}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.buttonText}>
              {models.find(m => m.id === selectedModel)?.name}
            </Text>
            <Icon
              name="arrow-drop-down"
              size={24}
              color={theme.text}
            />
          </TouchableOpacity>
        }
        onRequestClose={() => setVisible(false)}
        style={styles.menu}
      >
        {models.map((model) => (
          <MenuItem
            key={model.id}
            onPress={() => {
              onSelectModel(model.id);
              setVisible(false);
            }}
            textStyle={styles.menuItem}
          >
            {model.name}
          </MenuItem>
        ))}
      </Menu>
    </View>
  );
};

export default ModelSelector; 