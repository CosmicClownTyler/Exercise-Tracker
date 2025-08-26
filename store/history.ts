import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from "@/store";
import type { HistoryState, HistoryEntry } from '@/types/types';

// The initial default history state
export const defaultHistoryState: HistoryState = {
    entries: [],
};

// The history slice
export const historySlice = createSlice({
    name: 'history',
    initialState: defaultHistoryState,
    reducers: {
        revertToDefaultHistory: (state) => {
            console.warn('RESETTING HISTORY');
            state = defaultHistoryState;
        },
        addEntry: (state, action: PayloadAction<HistoryEntry>) => {
            state.entries.push(action.payload);
        },
    },
});

// The reducer for this slice
export const historyReducer = historySlice.reducer;

// The actions for this slice
export const {
    revertToDefaultHistory,
    addEntry
} = historySlice.actions;

// Basic selectors
export const selectHistory = (state: AppState) => state.history;
export const selectHistoryEntries = (state: AppState) => state.history.entries;

// export const selectHistoryEntryById = (state: AppState, id: number) => {
//     return state.history.entries.filter(entry => entry.id == id)[0];
// };
// export const selectHistoryEntriesByDate = (state: AppState, date: string) => {
//     return state.history.entries.filter(entry => entry.date == date);
// };