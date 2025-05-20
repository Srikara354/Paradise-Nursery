import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { Card, CardMedia, CardContent, CardActions, IconButton, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const ShoppingCartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Card elevation={2} sx={{ display: 'flex', alignItems: 'center', borderRadius: 2 }}>
      <CardMedia
        component="img"
        image={item.image}
        alt={item.name}
        sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 2, m: 1 }}
      />
      <Box sx={{ flex: 1 }}>
        <CardContent sx={{ pb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>{item.name}</Typography>
          <Typography variant="body2" color="text.secondary">₹{item.price * 80} x {item.quantity}</Typography>
        </CardContent>
        <CardActions sx={{ pl: 2, pb: 2 }}>
          <IconButton onClick={() => dispatch(increaseQuantity(item.id))} color="primary">
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(decreaseQuantity(item.id))} color="primary" disabled={item.quantity <= 1}>
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(removeFromCart(item.id))} color="error">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};

export default ShoppingCartItem;