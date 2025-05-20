import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Typography, Box, Divider, Button, Stack, Drawer, IconButton, TextField, MenuItem, Tooltip, InputAdornment, Switch, FormControlLabel } from "@mui/material";
import ShoppingCartItem from "../components/ShoppingCartItem";
import CloseIcon from '@mui/icons-material/Close';

const SHIPPING_OPTIONS = [
  { label: "Standard (₹100)", value: 100 },
  { label: "Express (₹250)", value: 250 },
];
const PROMO_CODES = { SAVE10: 0.1, PLANT5: 0.05 };

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [shipping, setShipping] = useState(100);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isGuest, setIsGuest] = useState(true);

  // Persistent cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      // Optionally, dispatch an action to load cart from localStorage
      // dispatch(loadCart(JSON.parse(saved)));
    }
  }, [dispatch]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const grandTotal = subtotal - discountAmount + shipping;

  const handlePromo = () => {
    const code = promo.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscount(PROMO_CODES[code]);
      setPromoError("");
    } else {
      setDiscount(0);
      setPromoError("Invalid code");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, position: 'relative' }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight={700} color="primary.main" sx={{ flexGrow: 1 }}>
            Your Shopping Cart
          </Typography>
        </Box>
        <FormControlLabel
          control={<Switch checked={isGuest} onChange={() => setIsGuest(!isGuest)} color="primary" />}
          label={isGuest ? "Guest Checkout" : "Login Required"}
          sx={{ mb: 2 }}
        />
        {cartItems.length === 0 ? (
          <Typography color="text.secondary">Your cart is empty.</Typography>
        ) : (
          <>
            <Stack spacing={2} divider={<Divider flexItem />} sx={{ mb: 2 }}>
              {cartItems.map((item) => (
                <ShoppingCartItem key={item.id} item={item} preview notes />
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <TextField
                label="Promo Code"
                value={promo}
                onChange={e => setPromo(e.target.value)}
                size="small"
                sx={{ mr: 2, width: 180 }}
                error={!!promoError}
                helperText={promoError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={handlePromo} size="small" variant="outlined">Apply</Button>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                select
                label="Shipping"
                value={shipping}
                onChange={e => setShipping(Number(e.target.value))}
                size="small"
                sx={{ width: 200 }}
              >
                {SHIPPING_OPTIONS.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ textAlign: 'right', mb: 2 }}>
              <Typography>Subtotal: ₹{subtotal}</Typography>
              {discount > 0 && <Typography color="success.main">Discount: -₹{discountAmount}</Typography>}
              <Typography>Shipping: ₹{shipping}</Typography>
              <Typography variant="h6" fontWeight={600}>Grand Total: ₹{grandTotal}</Typography>
            </Box>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ borderRadius: 3, width: 220, float: 'right', mb: 2 }}
              href="/checkout"
            >
              Checkout
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ position: 'fixed', right: 32, bottom: 32, zIndex: 1200 }}
              onClick={() => setSidebarOpen(true)}
            >
              View Cart Summary
            </Button>
            <Drawer anchor="right" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
              <Box sx={{ width: 320, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Cart Summary</Typography>
                  <IconButton onClick={() => setSidebarOpen(false)}><CloseIcon /></IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {cartItems.map(item => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Tooltip title={<img src={item.image} alt={item.name} width={120} />} placement="left">
                      <Typography fontWeight={600}>{item.name} x {item.quantity}</Typography>
                    </Tooltip>
                    <Typography variant="body2">₹{item.price} each</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Typography>Subtotal: ₹{subtotal}</Typography>
                {discount > 0 && <Typography color="success.main">Discount: -₹{discountAmount}</Typography>}
                <Typography>Shipping: ₹{shipping}</Typography>
                <Typography variant="h6" fontWeight={600}>Grand Total: ₹{grandTotal}</Typography>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ borderRadius: 3, width: '100%', mt: 2 }}
                  href="/checkout"
                >
                  Checkout
                </Button>
              </Box>
            </Drawer>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ShoppingCart;