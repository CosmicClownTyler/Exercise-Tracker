import { useStore, useSelector, useDispatch } from 'react-redux';
import type { AppStore, AppState, AppDispatch } from '@/store/';

export const useAppStore = useStore.withTypes<AppStore>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();