import { useAppSelector } from '@/hooks/hooks';
import { selectHistoryEntryById, selectHistoryEntriesByDate } from '@/store/history';

// Hook for getting history entries by id
export const useHistoryEntriesById = (id: number) => {
    // Get the history entries from the state
    const entries = useAppSelector(state => selectHistoryEntryById(state, id));

    return entries;
};
// Hook for getting history entries for a specific date
export const useHistoryEntriesByDate = (date: string | null) => {
    // Get the history entries from the state
    const entries = useAppSelector(state => date ? selectHistoryEntriesByDate(state, date) : []);

    return entries;
};