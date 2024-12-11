import { auth, firestore } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { setInitialUserSettings } from './realtimeDatabase';

// Sign up a new user
export const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      name,
      email,
      profilePicture: '',
      signUpDate: serverTimestamp(),
      balance: 0,
      tokens: 0,
      recentActivities: []
    });

    // Set initial user settings in Realtime Database
    await setInitialUserSettings(user.uid);

    return user;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Log in an existing user
export const logIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// Log out the current user
export const logOut = () => {
  return auth.signOut();
}; 