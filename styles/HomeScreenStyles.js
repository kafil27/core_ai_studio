// styles/HomeScreenStyles.js

import { StyleSheet } from 'react-native';

const HomeScreenStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    botContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    botImage: {
        width: 100,
        height: 100,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: theme.text,
    },
    servicesContainer: {
        marginVertical: 20,
    },
    servicesRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    recentActivityContainer: {
        marginVertical: 20,
        padding: 16,
        borderRadius: 8,
        backgroundColor: theme.background,
        borderColor: theme.border,
        borderWidth: 0,
    },
    recentActivityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    recentActivityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        color: theme.text,
    },
    emailContainer: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    emailText: {
        fontSize: 16,
        color: '#000',
    },
});

export default HomeScreenStyles;
