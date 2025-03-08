import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      item ? item.quantity++ : state.items.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      state.items.find((i) => i.id === action.payload).quantity++;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      item.quantity > 1 ? item.quantity-- : (state.items = state.items.filter((i) => i.id !== action.payload));
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
