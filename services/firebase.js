// services/firebase.js

// Import the required Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDjsHx20yI1NPO00yBGHEcUx0HJYuw9GO4",
  authDomain: "core-ai-8a73b.firebaseapp.com",
  databaseURL: "https://core-ai-8a73b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "core-ai-8a73b",
  storageBucket: "core-ai-8a73b.firebasestorage.app",
  messagingSenderId: "1003589117086",
  appId: "1:1003589117086:web:150e91a5a6893edfc5c78f",
  measurementId: "G-B3GEPRXM2J"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// Export the initialized Firebase services
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
