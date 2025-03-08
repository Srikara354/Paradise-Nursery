import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div style={{ border: "1px solid gray", padding: "1rem", margin: "1rem" }}>
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
