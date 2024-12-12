import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import settingsReducer from './reducers/settingsReducer';
import themeReducer from './reducers/themeReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'], // Only persist the theme reducer
};

const persistedReducer = persistReducer(persistConfig, themeReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    theme: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
export default store; 