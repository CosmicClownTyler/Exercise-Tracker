import { useAppSelector } from '@/hooks/hooks';
import { selectHistoryEntryById, selectHistoryEntriesByDate, selectHistoryEntriesByPartialDate } from '@/store/history';

// Hook for getting a history entry by id
export const useHistoryEntryById = (id: number | null) => {
    // Get the history entry from the state
    const entry = useAppSelector(state => id ? selectHistoryEntryById(state, id) : null);

    return entry;
};
// Hook for getting history entries for a specific date
export const useHistoryEntriesByDate = (date: string | null) => {
    // Get the history entries from the state
    const entries = useAppSelector(state => date ? selectHistoryEntriesByDate(state, date) : []);

    return entries;
};
// Hook for getting history entries for a specific month
export const useHistoryEntriesByPartialDate = (date: string | null) => {
    // Get the history entries from the state
    const entries = useAppSelector(state => date ? selectHistoryEntriesByPartialDate(state, date) : []);

    return entries;
};