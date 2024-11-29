// styles/HomeScreenStyles.js

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreenStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 30,
    },
    botContainer: {
        alignItems: 'center',
        marginVertical: 20,
        height: 180,
    },
    botImage: {
        width: 150,
        height: 150,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: isDarkMode ? 'white' : 'black',
        textAlign: 'center',
        marginBottom: 30,
    },
    servicesContainer: {
        marginBottom: 30,
        paddingHorizontal: 8,
    },
    servicesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        width: '100%',
    },
    recentActivityContainer: {
        borderWidth: 1,
        borderColor: isDarkMode ? '#333333' : '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
        marginHorizontal: 8,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    recentActivityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? '#333333' : '#e0e0e0',
    },
    recentActivityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: isDarkMode ? 'white' : 'black',
        marginLeft: 8,
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        width: width * 0.7,
    },
});

export default HomeScreenStyles;
