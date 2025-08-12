import { configureStore, combineReducers, Reducer, EnhancedStore } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Persistor, persistReducer, persistStore } from 'redux-persist';

import { historyReducer } from '@/store/history';
import { settingsReducer } from '@/store/settings';

// The combined root reducer
const rootReducer: Reducer = combineReducers({
    history: historyReducer,
    settings: settingsReducer,
});

// A config for persisting the root store with async storage
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['settings'],
};
// The accompanying persisted reducer
const persistedReducer: Reducer = persistReducer(persistConfig, rootReducer);

// A general function to create and return a store using the above reducer
export function createStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
    });
}
export function createPersistedStore() {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
    });
}

// The main store and persistor for the app
export const store: EnhancedStore = createPersistedStore();
export const persistor: Persistor = persistStore(store);

// use this to delete all persisted data while developing
// persistor.pause();
// persistor.flush().then(() => {
//     return persistor.purge();
// });