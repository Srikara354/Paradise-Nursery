import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Grid, Divider, RadioGroup, FormControlLabel, Radio, List, ListItem, ListItemText, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [payment, setPayment] = useState("card");
  // Always get the latest cart from localStorage if available
  const getCartFromStorage = () => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return cartItems;
  };
  const [shipping, setShipping] = useState(100);
  const [cart, setCart] = useState(getCartFromStorage());

  React.useEffect(() => {
    setCart(getCartFromStorage());
  }, [cartItems]);

  const subtotal = cart && cart.length > 0
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 80
    : 0;
  const grandTotal = subtotal + shipping;
  const shippingOptions = [
    { label: "Standard (₹100)", value: 100 },
    { label: "Express (₹250)", value: 250 },
    { label: "Free Pickup (₹0)", value: 0 },
  ];
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle order submission
    alert("Order placed! (Demo)");
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
          Checkout
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Address</Typography>
              <TextField
                label="Full Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                multiline
                minRows={3}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>Contact Info</Typography>
              <TextField
                label="Phone or Email"
                value={contact}
                onChange={e => setContact(e.target.value)}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>Payment Method</Typography>
              <RadioGroup value={payment} onChange={e => setPayment(e.target.value)}>
                <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                <FormControlLabel value="upi" control={<Radio />} label="UPI" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              <List>
                {cartItems.map(item => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={`${item.name} x ${item.quantity}`}
                      secondary={`₹${item.price * 80} each`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography>Subtotal: ₹{subtotal}</Typography>
              <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                <InputLabel>Shipping Option</InputLabel>
                <Select
                  value={shipping}
                  label="Shipping Option"
                  onChange={e => setShipping(Number(e.target.value))}
                  disabled={cart.length === 0}
                >
                  {shippingOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography>Shipping: ₹{shipping}</Typography>
              <Typography variant="h6" fontWeight={600}>Grand Total: ₹{grandTotal}</Typography>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="success" size="large" sx={{ mt: 4, float: 'right' }}>
            Place Order
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Checkout;
