import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent, Grid, Box, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PetsIcon from '@mui/icons-material/Pets';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ProductCard from '../components/ProductCard';
import { products } from './ProductListing';

const Home = () => {
  // Compatibility Checker state
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
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
          Welcome to Paradise Nursery
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Discover the joy of indoor gardening with our wide selection of healthy houseplants. Whether you're a beginner or an expert, we have the perfect plants to brighten your space!
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={600} color="secondary.main" gutterBottom>
          Popular Plants
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={500}>
                  <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Aloe Vera - Easy Care</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={500}>
                  <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Snake Plant - Low Light</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={500}>
                  <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Peace Lily - Air Purifier</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
        Start your plant journey today and bring nature indoors!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{ borderRadius: 3, px: 4 }}
        >
          Explore Plants
        </Button>
      </Box>

      {/* Compatibility Checker Section */}
      <Box sx={{ mt: 8, mb: 4 }}>
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
        {submitted && (
          <Box sx={{ mt: 4 }}>
            <div className="products">
              {filtered.length === 0 ? (
                <Typography color="error" sx={{ textAlign: 'center', width: '100%' }}>
                  No suitable plants found for these conditions.
                </Typography>
              ) : (
                <Grid container spacing={2} justifyContent="center">
                  {filtered.map((plant) => (
                    <Grid item xs={12} sm={6} md={4} key={plant.id}>
                      <Button
                        component={Link}
                        to="/products"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ py: 2, fontWeight: 600, fontSize: '1.1rem', borderRadius: 2 }}
                      >
                        {plant.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;