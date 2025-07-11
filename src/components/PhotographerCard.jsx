import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const PhotographerCard = ({ photographer }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="180"
        image={photographer.profilePic}
        alt={photographer.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {photographer.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          📍 {photographer.location}
        </Typography>
        <Typography variant="body2">💸 ₹{photographer.price}</Typography>
        <Typography variant="body2">⭐ {photographer.rating}</Typography>

        <Box mt={1}>
          {photographer.tags.map((tag, idx) => (
            <Chip key={idx} label={tag} size="small" sx={{ mr: 0.5 }} />
          ))}
        </Box>

        <Box mt={2}>
          <Button
            component={Link}
            to={`/profile/${photographer.id}`}
            variant="contained"
            fullWidth
          >
            View Profile
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PhotographerCard;
