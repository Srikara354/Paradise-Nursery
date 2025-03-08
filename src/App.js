import React from "react";
import Navbar from "./components/Navbar";
import ProductListing from "./pages/ProductListing";
import ShoppingCart from "./components/ShoppingCart";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <ProductListing />
      <ShoppingCart />
    </div>
  );
}

export default App;
