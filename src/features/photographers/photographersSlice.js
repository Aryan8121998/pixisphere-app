import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPhotographers = createAsyncThunk(
  'photographers/fetchPhotographers',
  async () => {
    const response = await axios.get('http://localhost:3001/photographers');
    return response.data;
  }
);

const photographerSlice = createSlice({
  name: 'photographers',
  initialState: {
  list: [],
  filteredList: [],
  searchQuery: '',
  status: 'idle',
  error: null,
},
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotographers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhotographers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPhotographers.fulfilled, (state, action) => {
  state.status = 'succeeded';
  state.list = action.payload;
  state.filteredList = action.payload; // <- use this to filter
});
;
  },
});

export const { setSearchQuery } = photographerSlice.actions;
export default photographerSlice.reducer;


