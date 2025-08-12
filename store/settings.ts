import { combineReducers } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import { themeReducer } from '@/store/theme'
import { preferencesReducer } from '@/store/preferences';

// The config for storing this data
const settingsConfig = {
    key: 'settings',
    storage: AsyncStorage,
    blacklist: ['theme', 'preferences'],
};

// The combined reducer for the settings
const combinedSettingsReducer = combineReducers({
    theme: themeReducer,
    preferences: preferencesReducer,
});

// The persisted reducer for the settings
export const settingsReducer = persistReducer(settingsConfig, combinedSettingsReducer);