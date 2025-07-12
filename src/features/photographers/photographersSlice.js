import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPhotographers = createAsyncThunk(
  'photographers/fetchPhotographers',
  async () => {
    const response = await axios.get('http://localhost:3001/photographers');
    return response.data;
  }
);

const initialState = {
  list: [],
  filteredList: [],
  searchQuery: '',
  visibleCount: 2,
  status: 'idle',
  error: null,
};

const photographerSlice = createSlice({
  name: 'photographers',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      const query = action.payload.toLowerCase();
      state.searchQuery = query;

      state.filteredList = state.list.filter((p) => {
        return (
          p.name.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.tags.some(tag => tag.toLowerCase().includes(query))
        );
      });
    },

    applyFilters: (state, action) => {
      const { price, ratings, styles, city } = action.payload;

      state.filteredList = state.list.filter((p) => {
        const matchPrice = p.price >= price[0] && p.price <= price[1];
        const matchRating = ratings.length ? ratings.some(r => p.rating >= r) : true;
        const matchStyles = styles.length ? styles.some(style => p.styles.includes(style)) : true;
        const matchCity = city ? p.location === city : true;

        return matchPrice && matchRating && matchStyles && matchCity;
      });
    },

    applySorting: (state, action) => {
      const sortType = action.payload;
      const sorted = [...state.filteredList];

      if (sortType === 'priceAsc') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortType === 'ratingDesc') {
        sorted.sort((a, b) => b.rating - a.rating);
      } else if (sortType === 'recent') {
        sorted.sort((a, b) => b.id - a.id); // higher ID = newer
      }

      state.filteredList = sorted;
    },

    increaseVisibleCount: (state) => {
      state.visibleCount += 6;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotographers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhotographers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        state.filteredList = action.payload;
      })
      .addCase(fetchPhotographers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setSearchQuery,
  applyFilters,
  applySorting,
  increaseVisibleCount,
} = photographerSlice.actions;

export default photographerSlice.reducer;
