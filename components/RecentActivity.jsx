// components/RecentActivity.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '../styles/RecentActivityStyles';
import { auth, getUserData } from '../services/firebase';

const RecentActivity = () => {
  const { theme } = useSelector((state) => state.theme);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userData = await getUserData(user.uid);
          if (userData && userData.recentActivities) {
            setActivities(userData.recentActivities);
          }
        }
      } catch (error) {
        console.error("Error fetching recent activities: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={theme.text} />;
  }

  return (
    <View style={styles.container}>
      {activities.length > 0 ? (
        activities.map((activity, index) => (
          <View key={index} style={[styles.activityContainer, { borderColor: theme.border }]}>
            <Text style={[styles.activityText, { color: theme.text }]}>{activity}</Text>
          </View>
        ))
      ) : (
        <Text style={[styles.activityText, { color: theme.text }]}>
          None 😢
        </Text>
      )}
    </View>
  );
};

export default RecentActivity;
