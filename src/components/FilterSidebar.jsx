import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox, MenuItem, Select, InputLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { applyFilters } from '../features/photographers/photographersSlice';

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.photographers);

  const [price, setPrice] = useState([0, 20000]);
  const [ratings, setRatings] = useState([]);
  const [styles, setStyles] = useState([]);
  const [city, setCity] = useState('');

  const uniqueStyles = [...new Set(list.flatMap(p => p.styles))];
  const uniqueCities = [...new Set(list.map(p => p.location))];

  const handleRatingChange = (value) => {
    setRatings((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  const handleStyleChange = (value) => {
    setStyles((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    dispatch(applyFilters({ price, ratings, styles, city }));
  }, [price, ratings, styles, city, dispatch]);

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6">Filters</Typography>

      <Typography gutterBottom sx={{ mt: 2 }}>Price Range (₹)</Typography>
      <Slider
        value={price}
        onChange={(e, newValue) => setPrice(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={20000}
      />

      <Typography gutterBottom sx={{ mt: 2 }}>Ratings</Typography>
      <FormGroup>
        {[4, 3, 2].map((rating) => (
          <FormControlLabel
            key={rating}
            control={<Checkbox checked={ratings.includes(rating)} onChange={() => handleRatingChange(rating)} />}
            label={`${rating}+ Stars`}
          />
        ))}
      </FormGroup>

      <Typography gutterBottom sx={{ mt: 2 }}>Styles</Typography>
      <FormGroup>
        {uniqueStyles.map((style) => (
          <FormControlLabel
            key={style}
            control={<Checkbox checked={styles.includes(style)} onChange={() => handleStyleChange(style)} />}
            label={style}
          />
        ))}
      </FormGroup>

      <Typography gutterBottom sx={{ mt: 2 }}>City</Typography>
      <InputLabel id="city-label">City</InputLabel>
      <Select
        labelId="city-label"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
      >
        <MenuItem value="">All</MenuItem>
        {uniqueCities.map((loc) => (
          <MenuItem key={loc} value={loc}>{loc}</MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default FilterSidebar;
