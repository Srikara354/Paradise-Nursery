import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Grid, Divider, RadioGroup, FormControlLabel, Radio, List, ListItem, ListItemText, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [payment, setPayment] = useState("card");
  const [shipping, setShipping] = useState(100);

  // On mount, if cartItems is empty but localStorage has cart, load it
  React.useEffect(() => {
    if (cartItems.length === 0) {
      const saved = localStorage.getItem("cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.forEach(item => {
          for (let i = 0; i < item.quantity; i++) {
            dispatch(addToCart(item));
          }
        });
      }
    }
  }, []);

  // Use Redux cartItems for all calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingDisplay = shipping;
  const grandTotal = subtotal + shippingDisplay;
  const shippingOptions = [
    { label: "Standard (₹100)", value: 100 },
    { label: "Express (₹250)", value: 250 },
  ];
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle order submission
    alert("Order placed! (Demo)");
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4 }}>
      <Paper elevation={6} sx={{ p: { xs: 2, md: 5 }, borderRadius: 5, backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.92)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom sx={{ letterSpacing: 1, textAlign: 'center' }}>
          Checkout
        </Typography>
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">Your cart is empty.</Typography>
          </Box>
        ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 2 }}>
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
                <RadioGroup value={payment} onChange={e => setPayment(e.target.value)} row>
                  <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                  <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                  <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                </RadioGroup>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3, minHeight: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                <Box sx={{ maxHeight: 220, overflowY: 'auto', mb: 2 }}>
                  {cartItems.map(item => (
                    <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                      <img src={item.image} alt={item.name} style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', marginRight: 12, border: '1px solid #e0e0e0' }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={600}>{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">Qty: {item.quantity} × ₹{item.price}</Typography>
                      </Box>
                      <Typography fontWeight={600}>₹{item.price * item.quantity}</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ background: '#f5f7fa', borderRadius: 2, p: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal</Typography>
                    <Typography fontWeight={600}>₹{subtotal}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Shipping</Typography>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={shipping}
                        label="Shipping Option"
                        onChange={e => setShipping(Number(e.target.value))}
                      >
                        {shippingOptions.map(opt => (
                          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontWeight={700}>Grand Total</Typography>
                    <Typography fontWeight={700}>₹{grandTotal}</Typography>
                  </Box>
                </Box>
                <Button type="submit" variant="contained" color="success" size="large" sx={{ borderRadius: 3, fontWeight: 600, fontSize: '1.1rem', boxShadow: 2, mt: 2 }} fullWidth>
                  Place Order
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </form>
        )}
      </Paper>
    </Box>
  );
};

export default Checkout;
