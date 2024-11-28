// screens/SettingsScreen.jsx

import React, { useContext } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
            <Text style={[styles.text, { color: isDarkMode ? 'white' : 'black' }]}>
                Current Theme: {isDarkMode ? 'Dark' : 'Light'}
            </Text>
            <Button title="Toggle Theme" onPress={toggleTheme} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default SettingsScreen;
