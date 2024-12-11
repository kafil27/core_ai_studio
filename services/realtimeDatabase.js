import { getDatabase, ref, set, get, onValue } from 'firebase/database';

const db = getDatabase();

// Set user settings
export const setUserSettings = async (userId, settings) => {
  const settingsRef = ref(db, `settings/${userId}`);
  await set(settingsRef, settings);
};

// Get user settings
export const getUserSettings = async (userId) => {
  const settingsRef = ref(db, `settings/${userId}`);
  const snapshot = await get(settingsRef);
  return snapshot.exists() ? snapshot.val() : null;
};

// Set initial user settings
export const setInitialUserSettings = async (userId) => {
  const settingsRef = ref(db, `settings/${userId}`);
  await set(settingsRef, {
    darkMode: false,
    notificationsEnabled: true,
    language: 'en'
  });
};

// Fetch user settings
export const fetchUserSettings = async (userId) => {
  const settingsRef = ref(db, `settings/${userId}`);
  const snapshot = await get(settingsRef);
  return snapshot.exists() ? snapshot.val() : null;
};

// Update user settings
export const updateUserSettings = async (userId, settings) => {
  const settingsRef = ref(db, `settings/${userId}`);
  await set(settingsRef, settings);
};

// Listen for changes in user settings
export const listenToUserSettings = (userId, callback) => {
  const settingsRef = ref(db, `settings/${userId}`);
  onValue(settingsRef, (snapshot) => {
    callback(snapshot.val());
  });
}; 