import { createSlice } from '@reduxjs/toolkit';
import { lightTheme, darkTheme } from '../context/themes';

const initialState = {
  theme: darkTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload === 'dark' ? darkTheme : lightTheme;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer; 