import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "./ProductListing";
import { Box, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Button, Grid, Switch, FormControlLabel } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const PlantCompatibilityChecker = () => {
  const [light, setLight] = useState("");
  const [humidity, setHumidity] = useState("");
  const [size, setSize] = useState("");
  const [watering, setWatering] = useState("");
  const [petFriendly, setPetFriendly] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFiltered(
      products.filter(
        (plant) =>
          (light ? plant.light === light : true) &&
          (humidity ? plant.humidity === humidity : true) &&
          (size ? plant.size === size : true) &&
          (watering ? plant.watering === watering : true) &&
          (!petFriendly || plant.petFriendly === true)
      )
    );
    setSubmitted(true);
  };

  return (
    <div className="product-listing">
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Plant Compatibility Checker
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Enter your room conditions to find suitable plants!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel><WbSunnyIcon fontSize="small" sx={{ mr: 1 }} />Light</InputLabel>
                    <Select value={light} label="Light" onChange={(e) => setLight(e.target.value)}>
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="bright">Bright</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel><OpacityIcon fontSize="small" sx={{ mr: 1 }} />Humidity</InputLabel>
                    <Select value={humidity} label="Humidity" onChange={(e) => setHumidity(e.target.value)}>
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel><FormatSizeIcon fontSize="small" sx={{ mr: 1 }} />Size</InputLabel>
                    <Select value={size} label="Size" onChange={(e) => setSize(e.target.value)}>
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value="small">Small</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="large">Large</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel><WaterDropIcon fontSize="small" sx={{ mr: 1 }} />Watering</InputLabel>
                    <Select value={watering} label="Watering" onChange={(e) => setWatering(e.target.value)}>
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch checked={petFriendly} onChange={(e) => setPetFriendly(e.target.checked)} color="success" />}
                    label={<span><PetsIcon fontSize="small" sx={{ mr: 1 }} />Pet Friendly</span>}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Check
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {submitted && (
        <Box sx={{ mt: 4 }}>
          <div className="products">
            {filtered.length === 0 ? (
              <Typography color="error" sx={{ textAlign: 'center', width: '100%' }}>
                No suitable plants found for these conditions.
              </Typography>
            ) : (
              filtered.map((plant) => <ProductCard key={plant.id} plant={plant} />)
            )}
          </div>
        </Box>
      )}
    </div>
  );
};

export default PlantCompatibilityChecker;
