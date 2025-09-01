import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Weekday } from '@/types/types';
import type { AppState } from "@/store";
import type { PreferencesState } from '@/types/types';

// The initial default preferences state
export const defaultPreferencesState: PreferencesState = {
    weekStartsOn: Weekday.Sunday,
    confirmBeforeDeletingEntry: true,
};

// The preferences slice
export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState: defaultPreferencesState,
    reducers: {
        revertToDefaultPreferences: () => {
            console.warn('RESETTING PREFERENCES');
            return defaultPreferencesState;
        },
        setWeekStartsOn: (state, action: PayloadAction<Weekday>) => {
            state.weekStartsOn = action.payload;
        },
        confirmBeforeDeletingEntry: (state) => {
            state.confirmBeforeDeletingEntry = true;
        },
        doNotConfirmBeforeDeletingEntry: (state) => {
            state.confirmBeforeDeletingEntry = false;
        },
    },
});

// The reducer for this slice
export const preferencesReducer = preferencesSlice.reducer;

// The actions for this slice
export const {
    revertToDefaultPreferences,
    setWeekStartsOn,
    confirmBeforeDeletingEntry,
    doNotConfirmBeforeDeletingEntry,
} = preferencesSlice.actions;

// Basic selectors
export const selectPreferences = (state: AppState) => state.settings.preferences;
export const selectPreferencesWeekStartsOn = (state: AppState) => state.settings.preferences.weekStartsOn;
export const selectPreferencesConfirmBeforeDeletingEntry = (state: AppState) => state.settings.preferences.confirmBeforeDeletingEntry;