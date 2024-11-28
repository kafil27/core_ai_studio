import { StyleSheet, Platform, StatusBar } from 'react-native';

const CommonScreenStyles = (isDarkMode) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#333333' : '#e0e0e0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? 'white' : 'black',
  },
  text: {
    fontSize: 16,
    color: isDarkMode ? 'white' : 'black',
  }
});

export default CommonScreenStyles; 