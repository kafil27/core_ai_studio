import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationsEnabled: true,
  soundEnabled: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
  },
});

export const { toggleNotifications, toggleSound } = settingsSlice.actions;
export default settingsSlice.reducer; 