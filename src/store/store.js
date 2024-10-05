import { configureStore } from '@reduxjs/toolkit';
import yourSlice from './yourSlice'; // Import your slice

const store = configureStore({
  reducer: {
    yourSlice: yourSlice, // Add your slice reducer here
  },
});

export default store;
