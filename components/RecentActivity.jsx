// components/RecentActivity.jsx

import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../styles/RecentActivityStyles';

const recentActivities = [
  { id: '1', activity: 'Generated an image' },
  { id: '2', activity: 'Started a new chat' },
  { id: '3', activity: 'Generated a video' },
  { id: '4', activity: 'Used voice assistant (beta)' },
];

const RecentActivity = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: isDarkMode ? 'white' : 'black' }]}>Recent Activities</Text>
      {recentActivities.map((item) => (
        <View key={item.id} style={[styles.activityContainer, { borderColor: isDarkMode ? '#ffffff' : '#000000' }]}>
          <Text style={[styles.activityText, { color: isDarkMode ? 'white' : 'black' }]}>{item.activity}</Text>
        </View>
      ))}
    </View>
  );
};

export default RecentActivity;
