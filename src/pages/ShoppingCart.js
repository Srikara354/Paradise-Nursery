import React from "react";
import { useSelector } from "react-redux";
import { Paper, Typography, Box, Divider, Button, Stack } from "@mui/material";
import ShoppingCartItem from "../components/ShoppingCartItem";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography color="text.secondary">Your cart is empty.</Typography>
        ) : (
          <>
            <Stack spacing={2} divider={<Divider flexItem />} sx={{ mb: 2 }}>
              {cartItems.map((item) => (
                <ShoppingCartItem key={item.id} item={item} />
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight={600} sx={{ textAlign: "right" }}>
              Total: ₹{totalPrice * 80}
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ShoppingCart;