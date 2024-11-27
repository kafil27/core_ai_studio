// screens/NotificationsScreen.jsx

import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const notificationsData = [
    { id: '1', message: 'New chat message from John Doe' },
    { id: '2', message: 'Your image generation is complete' },
    { id: '3', message: 'Video generation in progress' },
    { id: '4', message: 'Welcome to Core AI Studio!' },
];

const NotificationsScreen = () => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
            <FlatList
                data={notificationsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.notificationContainer, { borderColor: isDarkMode ? '#ffffff' : '#000000' }]}>
                        <Text style={[styles.notificationText, { color: isDarkMode ? 'white' : 'black' }]}>{item.message}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    notificationContainer: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    notificationText: {
        fontSize: 16,
    },
});

export default NotificationsScreen;
