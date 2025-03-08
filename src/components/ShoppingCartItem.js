import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";

const ShoppingCartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-img" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>${item.price} x {item.quantity}</p>
        <div className="cart-controls">
          <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
          <button onClick={() => dispatch(decreaseQuantity(item.id))} disabled={item.quantity <= 1}>-</button>
          <button onClick={() => dispatch(removeFromCart(item.id))} className="remove-btn">Remove</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
