import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { applySorting } from '../features/photographers/photographersSlice';

const SortDropdown = () => {
  const dispatch = useDispatch();

  const handleSort = (e) => {
    dispatch(applySorting(e.target.value));
  };

  return (
    <Box sx={{ mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select onChange={handleSort} defaultValue="">
          <MenuItem value="">None</MenuItem>
          <MenuItem value="priceAsc">Price: Low to High</MenuItem>
          <MenuItem value="ratingDesc">Rating: High to Low</MenuItem>
          <MenuItem value="recent">Recently Added</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortDropdown;
