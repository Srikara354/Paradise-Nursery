import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "./ProductListing";
import { Box, Card, Typography, FormControl, InputLabel, Select, MenuItem, Button, Grid, Switch, FormControlLabel } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

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
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f7fa 0%, #f5f7fa 100%)',
      py: 6,
      px: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
      <Card elevation={6} sx={{
        maxWidth: 540,
        width: '100%',
        borderRadius: 5,
        p: 4,
        backdropFilter: 'blur(8px)',
        background: 'rgba(255,255,255,0.85)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SearchIcon color="primary" sx={{ fontSize: 36, mr: 1 }} />
          <Typography variant="h4" fontWeight={700} color="primary.main">
            Compatibility Checker
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Find the perfect plant for your space!
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
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
              <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
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
              <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
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
              <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
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
                sx={{ mb: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ borderRadius: 3, py: 1.5, fontWeight: 600, fontSize: '1.1rem', boxShadow: 2 }}>
                Find Plants
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
      {submitted && (
        <Box sx={{ mt: 6, width: '100%', maxWidth: 1100 }}>
          {filtered.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
              <SentimentDissatisfiedIcon color="disabled" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6">No suitable plants found for these conditions.</Typography>
              <Typography variant="body2">Try changing your filters for more results.</Typography>
            </Box>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {filtered.map((plant) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={plant.id}>
                  <ProductCard plant={plant} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PlantCompatibilityChecker;
