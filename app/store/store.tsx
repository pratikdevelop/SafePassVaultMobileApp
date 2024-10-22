// store/store.js
import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Ensure this points to your root reducer
import { logger } from 'redux-logger';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
