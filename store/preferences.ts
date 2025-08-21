import { createSlice } from '@reduxjs/toolkit';

import { PreferencesState } from '@/types/types';

// The initial default preferences state
export const defaultPreferencesState: PreferencesState = {
    taskViewIsPopup: true,
};

// The preferences slice
export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState: defaultPreferencesState,
    reducers: {
        revertToDefaultPreferences: (state) => {
            console.warn('RESETTING PREFERENCES');
            state = defaultPreferencesState;
        },
        taskViewFullscreen: (state) => {
            state.taskViewIsPopup = false;
        },
        taskViewPopup: (state) => {
            state.taskViewIsPopup = true;
        },
    },
});

// The reducer for this slice
export const preferencesReducer = preferencesSlice.reducer;

// The actions for this slice
export const {
    revertToDefaultPreferences,
    taskViewFullscreen,
    taskViewPopup,
} = preferencesSlice.actions;