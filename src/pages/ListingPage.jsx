import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPhotographers,
  increaseVisibleCount
} from '../features/photographers/photographersSlice';
import PhotographerCard from '../components/PhotographerCard';
import {
  Grid,
  Typography,
  CircularProgress,
  Container,
  Box,
  Button
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';

const ListingPage = () => {
  const dispatch = useDispatch();
  const { filteredList, status, error, visibleCount } = useSelector(
    (state) => state.photographers
  );

  useEffect(() => {
    dispatch(fetchPhotographers());
  }, [dispatch]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Maternity Photographers in Bengaluru
      </Typography>

      <SearchBar />
      <SortDropdown />

      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ width: 250 }}>
          <FilterSidebar />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          {status === 'loading' && <CircularProgress />}
          {status === 'failed' && <Typography color="error">{error}</Typography>}

          <Grid container spacing={2}>
            {filteredList.slice(0, visibleCount).map((photographer) => (
              <Grid item xs={12} sm={6} md={4} key={photographer.id}>
                <PhotographerCard photographer={photographer} />
              </Grid>
            ))}
          </Grid>

          {visibleCount < filteredList.length && (
            <Box textAlign="center" mt={4}>
              <Button
                variant="outlined"
                onClick={() => dispatch(increaseVisibleCount())}
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ListingPage;
