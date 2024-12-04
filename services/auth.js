import { auth } from './firebase';

// Sign up a new user
export const signUp = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

// Log in an existing user
export const logIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// Log out the current user
export const logOut = () => {
  return auth.signOut();
}; 