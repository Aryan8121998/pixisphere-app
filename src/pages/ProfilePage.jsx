import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Typography, Box, Chip, Grid, CardMedia, Button, Modal, TextField
} from '@mui/material';

const ProfilePage = () => {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/photographers/${id}`)
      .then(res => setPhotographer(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!photographer) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{photographer.name}</Typography>
      <Typography>{photographer.bio}</Typography>
      <Typography sx={{ mt: 1 }}>📍 {photographer.location}</Typography>
      <Typography>💸 ₹{photographer.price}</Typography>
      <Typography>⭐ {photographer.rating}</Typography>

      <Box mt={2}>
        <Typography variant="h6">Styles</Typography>
        {photographer.styles.map((style, i) => (
          <Chip key={i} label={style} sx={{ mr: 1, mt: 1 }} />
        ))}
      </Box>

      <Box mt={2}>
        <Typography variant="h6">Tags</Typography>
        {photographer.tags.map((tag, i) => (
          <Chip key={i} label={tag} color="primary" sx={{ mr: 1, mt: 1 }} />
        ))}
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Portfolio</Typography>
        <Grid container spacing={2}>
          {photographer.portfolio.map((img, i) => (
            <Grid item xs={6} md={4} key={i}>
              <CardMedia component="img" image={img} alt="portfolio" height="140" />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Reviews</Typography>
        {photographer.reviews.map((review, i) => (
          <Box key={i} mt={2}>
            <Typography variant="subtitle2">{review.name} ({review.rating}★)</Typography>
            <Typography variant="body2">{review.comment}</Typography>
            <Typography variant="caption">{review.date}</Typography>
          </Box>
        ))}
      </Box>

      <Box mt={4}>
        <Button variant="contained" onClick={() => setOpen(true)}>Send Inquiry</Button>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: 'white',
            maxWidth: 400,
            mx: 'auto',
            mt: '15%',
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>Send Inquiry</Typography>
          <TextField fullWidth label="Your Name" sx={{ mb: 2 }} />
          <TextField fullWidth label="Email" sx={{ mb: 2 }} />
          <TextField fullWidth label="Message" multiline rows={4} />
          <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={() => setOpen(false)}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
