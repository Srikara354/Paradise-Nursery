import React from "react";
import { useSelector } from "react-redux";
import ShoppingCartItem from "../components/ShoppingCartItem";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
        <>
          {cartItems.map((item) => (
            <ShoppingCartItem key={item.id} item={item} />
          ))}
          <h3>Total: ${totalPrice}</h3>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;