import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Weekday } from '@/types/types';
import type { PreferencesState } from '@/types/types';

// The initial default preferences state
export const defaultPreferencesState: PreferencesState = {
    weekStartsOn: Weekday.Sunday,
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
        setWeekStartsOn: (state, action: PayloadAction<Weekday>) => {
            state.weekStartsOn = action.payload;
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
    setWeekStartsOn,
    taskViewFullscreen,
    taskViewPopup,
} = preferencesSlice.actions;