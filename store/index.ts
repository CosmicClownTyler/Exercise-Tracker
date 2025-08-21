import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { historyReducer } from '@/store/history';
import { settingsReducer } from '@/store/settings';

// The root reducer
const rootReducer = combineReducers({
    history: historyReducer,
    settings: settingsReducer,
});

// Redux Persist config
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

// The persisted reducer
const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

// The main store and persistor for the app
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
export const persistor = persistStore(store);

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the type of the state from the store
export type AppState = ReturnType<typeof store.getState>;
// Infer the type of the dispatch from the store itself
export type AppDispatch = typeof store.dispatch;

// use this to delete all persisted data while developing
// persistor.pause();
// persistor.flush().then(() => {
//     return persistor.purge();
// });