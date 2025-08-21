import { combineReducers } from '@reduxjs/toolkit';

import { themeReducer } from '@/store/theme'
import { preferencesReducer } from '@/store/preferences';

// The reducer for the settings
export const settingsReducer = combineReducers({
    theme: themeReducer,
    preferences: preferencesReducer,
});