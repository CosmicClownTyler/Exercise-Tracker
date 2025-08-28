import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Weekday } from '@/types/types';
import type { AppState } from "@/store";
import type { PreferencesState } from '@/types/types';

// The initial default preferences state
export const defaultPreferencesState: PreferencesState = {
    weekStartsOn: Weekday.Sunday,
    homepageListView: true,
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
        homepageListView: (state) => {
            state.homepageListView = true;
        },
        homepageGridView: (state) => {
            state.homepageListView = false;
        },
    },
});

// The reducer for this slice
export const preferencesReducer = preferencesSlice.reducer;

// The actions for this slice
export const {
    revertToDefaultPreferences,
    setWeekStartsOn,
    homepageListView,
    homepageGridView,
} = preferencesSlice.actions;

// Basic selectors
export const selectPreferences = (state: AppState) => state.settings.preferences;
export const selectPreferencesWeekStartsOn = (state: AppState) => state.settings.preferences.weekStartsOn;
export const selectPreferencesHomepageListView = (state: AppState) => state.settings.preferences.homepageListView;