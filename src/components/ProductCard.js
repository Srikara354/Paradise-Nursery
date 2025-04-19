import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ plant }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <img src={plant.image} alt={plant.name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
      <h3>{plant.name}</h3>
      <p>${plant.price}</p>
      <button onClick={() => dispatch(addToCart(plant))}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;