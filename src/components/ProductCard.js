import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

const ProductCard = ({ plant }) => {
  const dispatch = useDispatch();

  return (
    <Card elevation={4} sx={{ borderRadius: 3, minWidth: 250 }}>
      <CardMedia
        component="img"
        height="200"
        image={plant.image}
        alt={plant.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>{plant.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary">₹{plant.price}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          component={Link}
          to={`/care/${encodeURIComponent(plant.name)}`}
          variant="outlined"
          color="info"
          startIcon={<InfoIcon />}
          sx={{ borderRadius: 2 }}
        >
          Care Guide
        </Button>
        <Button
          onClick={() => dispatch(addToCart(plant))}
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          sx={{ borderRadius: 2 }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;