import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Paradise Nursery</h1>
      <p className="home-description">Discover the joy of indoor gardening with our wide selection of healthy houseplants. Whether you're a beginner or an expert, we have the perfect plants to brighten your space!</p>
      <div className="home-highlights">
        <h2>Popular Plants</h2>
        <ul>
          <li><Link to="/products">Aloe Vera - Easy Care</Link></li>
          <li><Link to="/products">Snake Plant - Low Light</Link></li>
          <li><Link to="/products">Peace Lily - Air Purifier</Link></li>
        </ul>
      </div>
      <p className="home-callout">Start your plant journey today and bring nature indoors!</p>
      <Link to="/products">
        <button className="home-button">Explore Plants</button>
      </Link>
    </div>
  );
};

export default Home;