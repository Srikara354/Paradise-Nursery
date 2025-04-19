import React from "react";
import ProductCard from "../components/ProductCard";
import plant1 from "../assets/plant1.jpg";
import plant2 from "../assets/plant2.jpg";
import plant3 from "../assets/plant3.jpg";

const products = [
  { id: 1, name: "Aloe Vera", price: 10, image: plant1 },
  { id: 2, name: "Snake Plant", price: 15, image: plant2 },
  { id: 3, name: "Peace Lily", price: 12, image: plant3 },
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