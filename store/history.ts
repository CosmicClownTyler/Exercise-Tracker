import { createSlice } from '@reduxjs/toolkit';

import type { HistoryState } from '@/types/types';

// The initial default history state
export const defaultHistoryState: HistoryState = {
    dates: [],
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
        addDate: (state, action) => {
            state.dates.push(action.payload);
        },
    },
});

// The reducer for this slice
export const historyReducer = historySlice.reducer;

// The actions for this slice
export const {
    revertToDefaultHistory,
    addDate
} = historySlice.actions;