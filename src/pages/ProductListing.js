import React from "react";
import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Rose Plant", price: 150 },
  { id: 2, name: "Tulsi Plant", price: 100 },
];

function ProductListing() {
  return (
    <div>
      <h2>Available Plants</h2>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductListing;
