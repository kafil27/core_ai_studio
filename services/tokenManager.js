import { db } from './firebase';

// Function to update token balance
export const updateTokenBalance = (userId, amount) => {
  const userRef = db.collection('users').doc(userId);
  return userRef.update({
    tokenBalance: firebase.firestore.FieldValue.increment(amount),
  });
};

// Function to deduct tokens for API request
export const deductTokensForRequest = (userId, cost) => {
  return updateTokenBalance(userId, -cost);
}; 