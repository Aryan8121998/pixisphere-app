import React, { useCallback } from 'react';
import { TextField, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/photographers/photographersSlice';
import debounce from 'lodash/debounce';

const SearchBar = () => {
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setSearchQuery(value));
    }, 300),
    []
  );

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Search by name, location, or tag"
        onChange={handleChange}
        variant="outlined"
      />
    </Box>
  );
};

export default SearchBar;
