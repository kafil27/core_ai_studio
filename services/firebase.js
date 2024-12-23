// services/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
let auth;
if (!auth) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

const firestore = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics if supported
isSupported().then(supported => {
  if (supported) {
    getAnalytics(app);
  }
});

// Function to get user dataf
export const getUserData = async (userId) => {
  const userDoc = await getDoc(doc(firestore, 'users', userId));
  return userDoc.exists() ? userDoc.data() : null;
};

// Function to update user data
export const updateUserData = async (userId, data) => {
  await updateDoc(doc(firestore, 'users', userId), data);
};

export const updateUserName = async (userId, newName) => {
  try {
    const userDocRef = doc(firestore, 'users', userId);
    await updateDoc(userDocRef, { name: newName });
    console.log('User name updated successfully');
  } catch (error) {
    console.error('Error updating user name:', error);
    throw error;
  }
};

export { auth, firestore, storage };
