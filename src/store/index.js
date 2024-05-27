import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import filterReducer from './filterSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedFilterReducer = persistReducer(persistConfig, filterReducer);

const rootReducer = {
    user: userReducer,
    filter: persistedFilterReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;
