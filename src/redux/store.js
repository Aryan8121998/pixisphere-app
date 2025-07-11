import { configureStore } from '@reduxjs/toolkit';
import photographerReducer from '../features/photographers/photographersSlice';
// import photographerReducer from ''

export const store = configureStore({
  reducer: {
    photographers: photographerReducer,
  },
});
