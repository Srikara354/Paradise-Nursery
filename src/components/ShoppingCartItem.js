import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { Card, CardMedia, CardContent, CardActions, IconButton, Typography, Box, Tooltip, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const ShoppingCartItem = ({ item, preview, notes }) => {
  const dispatch = useDispatch();
  const [note, setNote] = React.useState(item.note || "");
  // Save note to localStorage for persistence
  React.useEffect(() => {
    if (notes) {
      const cartNotes = JSON.parse(localStorage.getItem("cartNotes") || '{}');
      cartNotes[item.id] = note;
      localStorage.setItem("cartNotes", JSON.stringify(cartNotes));
    }
  }, [note, item.id, notes]);

  React.useEffect(() => {
    if (notes) {
      const cartNotes = JSON.parse(localStorage.getItem("cartNotes") || '{}');
      if (cartNotes[item.id]) setNote(cartNotes[item.id]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Card elevation={2} sx={{ display: 'flex', alignItems: 'center', borderRadius: 2, position: 'relative' }}>
      {preview ? (
        <Tooltip title={<img src={item.image} alt={item.name} width={120} />} placement="right">
          <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 2, m: 1, cursor: 'pointer' }}
          />
        </Tooltip>
      ) : (
        <CardMedia
          component="img"
          image={item.image}
          alt={item.name}
          sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 2, m: 1 }}
        />
      )}
      <Box sx={{ flex: 1 }}>
        <CardContent sx={{ pb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>{item.name}</Typography>
          <Typography variant="body2" color="text.secondary">₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</Typography>
          {notes && (
            <TextField
              label="Add note"
              value={note}
              onChange={e => setNote(e.target.value)}
              size="small"
              fullWidth
              sx={{ mt: 1 }}
            />
          )}
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