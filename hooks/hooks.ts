import { useStore, useSelector, useDispatch } from 'react-redux';

import type { AppStore, AppState, AppDispatch } from '@/store/';

// Typed store, selector, and dispatch
export const useAppStore = useStore.withTypes<AppStore>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();