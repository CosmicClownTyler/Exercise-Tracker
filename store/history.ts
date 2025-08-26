import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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