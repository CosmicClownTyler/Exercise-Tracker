import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import type { AppState } from "@/store";
import type { HistoryState, HistoryEntry, NewHistoryEntry } from '@/types/types';

// The initial default history state
export const defaultHistoryState: HistoryState = {
    byId: {},
    allIds: [],
    nextId: 1,
};

// The history slice
export const historySlice = createSlice({
    name: 'history',
    initialState: defaultHistoryState,
    reducers: {
        revertToDefaultHistory: () => {
            console.warn('RESETTING HISTORY');
            return defaultHistoryState;
        },
        addEntry: (state, action: PayloadAction<NewHistoryEntry>) => {
            // The ID for this new entry
            const id = state.nextId;

            // The new entry to add
            const entry: HistoryEntry = { ...action.payload, id };

            // Add the entry
            state.byId[id] = entry;
            state.allIds.push(id);

            // Increment the ID
            state.nextId++;
        },
        removeEntry: (state, action: PayloadAction<number>) => {
            const idToRemove = action.payload;
            delete state.byId[idToRemove];
            state.allIds = state.allIds.filter(id => id != idToRemove);
        },
        updateEntry: (state, action: PayloadAction<HistoryEntry>) => {
            // The entry to update
            const entry = action.payload;

            // If an entry with this id does exist, update it
            if (state.allIds.includes(entry.id)) {
                state.byId[entry.id] = entry;
            }
            // Else log a warning and do not update anything
            else {
                console.warn(`Entry with this ID (${entry.id}) does not exist and cannot be updated. `);
            }
        },
    },
});

// The reducer for this slice
export const historyReducer = historySlice.reducer;

// The actions for this slice
export const {
    revertToDefaultHistory,
    addEntry,
    removeEntry,
    updateEntry,
} = historySlice.actions;

// Basic selectors
export const selectHistory = (state: AppState) => state.history;
export const selectHistoryNextId = (state: AppState) => state.history.nextId;
export const selectHistoryEntryId = (state: AppState, id: number) => id;
export const selectHistoryEntryDate = (state: AppState, date: string) => date;
export const selectHistoryEntryPartialDate = (state: AppState, date: string) => date;

// Memoized selectors
export const selectHistoryEntries = createSelector(
    [selectHistory],
    (history: HistoryState) => {
        return history.allIds.map(id => history.byId[id]);
    }
);
export const selectHistoryEntryById = createSelector(
    [selectHistory, selectHistoryEntryId],
    (history: HistoryState, id: number) => {
        return history.byId[id];
    }
);
export const selectHistoryEntriesByDate = createSelector(
    [selectHistoryEntries, selectHistoryEntryDate],
    (entries: HistoryEntry[], date: string) => {
        return entries.filter(entry => entry.date == date);
    }
);
export const selectHistoryEntriesByPartialDate = createSelector(
    [selectHistoryEntries, selectHistoryEntryPartialDate],
    (entries: HistoryEntry[], date: string) => {
        return entries.filter(entry => entry.date.includes(date));
    }
);