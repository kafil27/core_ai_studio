import { firestore } from './firebase';

// Add or update user data
export const updateUserData = (userId, data) => {
  return firestore.collection('users').doc(userId).set(data, { merge: true });
};

// Get user data
export const getUserData = (userId) => {
  return firestore.collection('users').doc(userId).get();
}; 