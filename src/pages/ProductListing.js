import React from "react";
import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Aloe Vera", price: 10, image: "/assets/plant1.jpg" },
  { id: 2, name: "Snake Plant", price: 15, image: "/assets/plant2.jpg" },
  { id: 3, name: "Peace Lily", price: 12, image: "/assets/plant3.jpg" },
];

const ProductListing = () => {
  return (
    <div className="product-listing">
      <h2>Our Plants</h2>
      <div className="products">
        {products.map((plant) => (
          <ProductCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
