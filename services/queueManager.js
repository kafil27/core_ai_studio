import firebase from 'firebase/app';
import 'firebase/database';

const db = firebase.database();

// Function to add a request to the queue
export const addRequestToQueue = (userId, requestData) => {
  const requestRef = db.ref('requests').push();
  requestRef.set({
    userId,
    requestData,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    priority: calculatePriority(userId),
  });
};

// Function to calculate request priority
const calculatePriority = (userId) => {
  // Fetch user token balance and calculate priority
  // Higher token balance = higher priority
  return db.ref(`users/${userId}/tokenBalance`).once('value').then(snapshot => {
    const tokenBalance = snapshot.val() || 0;
    return tokenBalance;
  });
}; 