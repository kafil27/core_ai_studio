import { firestore } from './firebase';
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

// Add or update user data
export const updateUserData = async (userId, data) => {
  const userRef = doc(firestore, 'users', userId);
  await setDoc(userRef, data, { merge: true });
};

// Get user data
export const getUserData = async (userId) => {
  const userRef = doc(firestore, 'users', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() : null;
};

// Add recent activity
export const addRecentActivity = async (userId, activityType) => {
  const activityRef = doc(collection(firestore, 'recentActivities'));
  await setDoc(activityRef, {
    userId,
    activityType,
    timestamp: serverTimestamp()
  });

  // Update user's recent activities
  const userRef = doc(firestore, 'users', userId);
  await updateDoc(userRef, {
    recentActivities: arrayUnion(activityRef.id)
  });
}; 