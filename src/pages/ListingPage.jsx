import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotographers } from '../features/photographers/photographersSlice';
import PhotographerCard from '../components/PhotographerCard';
import { Grid, Typography, CircularProgress, Container } from '@mui/material';
import SearchBar from '../components/SearchBar';

const ListingPage = () => {
  const dispatch = useDispatch();
  const { filteredList, status, error } = useSelector((state) => state.photographers);

  useEffect(() => {
    dispatch(fetchPhotographers());
  }, [dispatch]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Maternity Photographers in Bengaluru
      </Typography>
    
      <SearchBar />

      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2}>
        {filteredList.map((photographer) => (
          <Grid item xs={12} sm={6} md={4} key={photographer.id}>
            <PhotographerCard photographer={photographer} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListingPage;
