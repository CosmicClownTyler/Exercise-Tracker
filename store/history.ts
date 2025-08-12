import { CaseReducer, PayloadAction, Slice, createSlice, Reducer } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import { HistoryState } from '@/types/types';

// The initial default history state
const defaultHistoryState: HistoryState = {
    dates: [],
};

// The individual reducer functions
// Revert the history back to the default
const _revertToDefaultHistory: CaseReducer<HistoryState> = (state) => {
    console.warn('RESETTING HISTORY');
    state = defaultHistoryState;
};
// Add a date to the history
const _addDate: CaseReducer<HistoryState, PayloadAction<Date>> = (state, action) => {
    state.dates.push(action.payload);
};

// The history slice
export const historySlice: Slice = createSlice({
    name: 'history',
    initialState: defaultHistoryState,
    reducers: {
        revertToDefaultHistory: _revertToDefaultHistory,
        addDate: _addDate,
    },
});

// The config for storing this data
const historyConfig = {
    key: 'history',
    storage: AsyncStorage,
    blacklist: [],
};

// The persisted reducer for this slice
export const historyReducer: Reducer = persistReducer(historyConfig, historySlice.reducer);

// The actions for this slice
export const {
    revertToDefaultHistory,
    addDate
} = historySlice.actions;