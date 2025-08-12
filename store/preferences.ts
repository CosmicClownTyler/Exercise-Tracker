import { CaseReducer,  Slice, createSlice, Reducer } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import { PreferencesState } from '@/types/types';

// The initial default preferences state
export const defaultPreferencesState: PreferencesState = {
    taskViewIsPopup: true,
};

// The individual reducer functions
// Revert the preferences back to the default
const _revertToDefaultPreferences: CaseReducer<PreferencesState> = (state) => {
    console.warn('RESETTING PREFERENCES');
    state = defaultPreferencesState;
};
// Set the task view to full screen
const _taskViewFullscreen: CaseReducer<PreferencesState> = (state) => {
    state.taskViewIsPopup = false;
};
// Set the task view to a popup modal
const _taskViewPopup: CaseReducer<PreferencesState> = (state) => {
    state.taskViewIsPopup = true;
};

// The preferences slice
export const preferencesSlice: Slice = createSlice({
    name: 'preferences',
    initialState: defaultPreferencesState,
    reducers: {
        revertToDefaultPreferences: _revertToDefaultPreferences,
        taskViewFullscreen: _taskViewFullscreen,
        taskViewPopup: _taskViewPopup
    },
});

// The config for storing this data
const preferencesConfig = {
    key: 'preferences',
    storage: AsyncStorage,
};

// The persisted reducer for this slice
export const preferencesReducer: Reducer = persistReducer(preferencesConfig, preferencesSlice.reducer);

// The actions for this slice
export const {
    revertToDefaultPreferences,
    taskViewFullscreen,
    taskViewPopup,
} = preferencesSlice.actions;