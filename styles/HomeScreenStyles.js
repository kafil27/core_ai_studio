// styles/HomeScreenStyles.js

import { StyleSheet } from 'react-native';

const HomeScreenStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#000000' : '#ffffff', // Background color based on theme
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: isDarkMode ? '#121212' : '#f5f5f5', // Header color based on theme
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    greetingText: {
        fontSize: 18,
        color: isDarkMode ? 'white' : 'black', // Text color based on theme
        marginBottom: 20,
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    serviceButton: {
        width: '40%',
        margin: 10,
        borderRadius: 10,
    },
    gradient: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    serviceText: {
        color: 'white',
        fontSize: 16,
    },
});

export default HomeScreenStyles;
