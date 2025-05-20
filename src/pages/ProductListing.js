import React from "react";
import ProductCard from "../components/ProductCard";
import AloeVera from "../assets/Aloe Vera.jpg";
import SnakePlant from "../assets/Snake Plant.jpg";
import PeaceLily from "../assets/Peace Lily.jpg";
import SpiderPlant from "../assets/Spider Plant.webp";
import Pothos from "../assets/Pothos.jpeg";
import ZZPlant from "../assets/ZZ plant.jpeg";
import RubberPlant from "../assets/Rubber plant.jpeg";
import FiddleLeafFig from "../assets/Fiddle leaf fig.jpeg";
import JadePlant from "../assets/Jade plant.jpeg";
import BostonFern from "../assets/Boston fern.jpeg";
import Calathea from "../assets/Calathea.jpeg";
import { Grid, Container, Typography, Box } from "@mui/material";

export const products = [
  {
    id: 1,
    name: "Aloe Vera",
    price: 250,
    image: AloeVera,
    light: "bright",
    humidity: "low",
    petFriendly: false,
    size: "small",
    watering: "low",
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 400,
    image: SnakePlant,
    light: "low",
    humidity: "low",
    petFriendly: false,
    size: "medium",
    watering: "low",
  },
  {
    id: 3,
    name: "Peace Lily",
    price: 350,
    image: PeaceLily,
    light: "medium",
    humidity: "high",
    petFriendly: false,
    size: "medium",
    watering: "medium",
  },
  {
    id: 4,
    name: "Spider Plant",
    price: 200,
    image: SpiderPlant,
    light: "bright",
    humidity: "medium",
    petFriendly: true,
    size: "small",
    watering: "medium",
  },
  {
    id: 5,
    name: "Pothos",
    price: 300,
    image: Pothos,
    light: "low",
    humidity: "medium",
    petFriendly: false,
    size: "medium",
    watering: "low",
  },
  {
    id: 6,
    name: "ZZ Plant",
    price: 600,
    image: ZZPlant,
    light: "low",
    humidity: "low",
    petFriendly: false,
    size: "medium",
    watering: "low",
  },
  {
    id: 7,
    name: "Rubber Plant",
    price: 700,
    image: RubberPlant,
    light: "bright",
    humidity: "high",
    petFriendly: false,
    size: "large",
    watering: "medium",
  },
  {
    id: 8,
    name: "Fiddle Leaf Fig",
    price: 1200,
    image: FiddleLeafFig,
    light: "bright",
    humidity: "high",
    petFriendly: false,
    size: "large",
    watering: "high",
  },
  {
    id: 9,
    name: "Jade Plant",
    price: 350,
    image: JadePlant,
    light: "bright",
    humidity: "low",
    petFriendly: false,
    size: "small",
    watering: "low",
  },
  {
    id: 10,
    name: "Boston Fern",
    price: 400,
    image: BostonFern,
    light: "medium",
    humidity: "high",
    petFriendly: true,
    size: "medium",
    watering: "high",
  },
  {
    id: 11,
    name: "Calathea",
    price: 500,
    image: Calathea,
    light: "low",
    humidity: "high",
    petFriendly: true,
    size: "medium",
    watering: "medium",
  },
];

const ProductListing = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <div className="product-listing-header">
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary.main"
            sx={{ flexGrow: 1 }}
          >
            Our Plants
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Browse our beautiful collection of healthy houseplants!
        </Typography>
      </div>
      <Grid container spacing={4} justifyContent="center">
        {products.map((plant) => (
          <Grid item xs={12} sm={6} md={4} key={plant.id}>
            <ProductCard plant={plant} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductListing;