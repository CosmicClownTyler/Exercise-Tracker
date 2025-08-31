import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Weekday } from '@/types/types';
import type { AppState } from "@/store";
import type { PreferencesState } from '@/types/types';

// The initial default preferences state
export const defaultPreferencesState: PreferencesState = {
    weekStartsOn: Weekday.Sunday,
    exercisesListView: true,
    historyEntryFloatingButton: true,
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
        exercisesListView: (state) => {
            state.exercisesListView = true;
        },
        exercisesGridView: (state) => {
            state.exercisesListView = false;
        },
        historyEntryFloatingButton: (state) => {
            state.historyEntryFloatingButton = true;
        },
        historyEntryFixedButton: (state) => {
            state.historyEntryFloatingButton = false;
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
    exercisesListView,
    exercisesGridView,
    historyEntryFloatingButton,
    historyEntryFixedButton,
    confirmBeforeDeletingEntry,
    doNotConfirmBeforeDeletingEntry,
} = preferencesSlice.actions;

// Basic selectors
export const selectPreferences = (state: AppState) => state.settings.preferences;
export const selectPreferencesWeekStartsOn = (state: AppState) => state.settings.preferences.weekStartsOn;
export const selectPreferencesExercisesListView = (state: AppState) => state.settings.preferences.exercisesListView;
export const selectPreferencesHistoryEntryFloatingButton = (state: AppState) => state.settings.preferences.historyEntryFloatingButton;
export const selectPreferencesConfirmBeforeDeletingEntry = (state: AppState) => state.settings.preferences.confirmBeforeDeletingEntry;