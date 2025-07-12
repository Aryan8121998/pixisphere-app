import { configureStore } from '@reduxjs/toolkit';
import photographerReducer from '../features/photographers/photographersSlice';


export const store = configureStore({
  reducer: {
    photographers: photographerReducer,
  },
});
