import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";

function ShoppingCart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : cart.map((item) => (
        <div key={item.id} style={{ border: "1px solid black", padding: "1rem", margin: "1rem" }}>
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
          <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
          <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default ShoppingCart;
