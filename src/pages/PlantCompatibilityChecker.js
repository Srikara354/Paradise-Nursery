import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "./ProductListing";
import { Box, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Button, Grid, Switch, FormControlLabel } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import axios from "axios";

const PlantCompatibilityChecker = () => {
  const [light, setLight] = useState("");
  const [humidity, setHumidity] = useState("");
  const [size, setSize] = useState("");
  const [watering, setWatering] = useState("");
  const [petFriendly, setPetFriendly] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalSuggestions, setGlobalSuggestions] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAIError] = useState("");

  const handleSubmit = async (e) => {
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
    setLoadingAI(true);
    setAIError("");
    setGlobalSuggestions([]);
    try {
      // Replace with your AI API endpoint and key
      const prompt = `Suggest 5 houseplants from around the world that match these conditions: light=${light||'any'}, humidity=${humidity||'any'}, size=${size||'any'}, watering=${watering||'any'}, petFriendly=${petFriendly}. Return only a JSON array of plant names.`;
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      // Try to parse the AI response as a JSON array
      let plantNames = [];
      try {
        plantNames = JSON.parse(response.data.choices[0].message.content);
      } catch {
        // fallback: extract lines
        plantNames = response.data.choices[0].message.content
          .split("\n")
          .map((l) => l.replace(/^\d+\.\s*/, "").trim())
          .filter(Boolean);
      }
      setGlobalSuggestions(plantNames);
    } catch (err) {
      setAIError("Could not fetch global plant suggestions.");
    }
    setLoadingAI(false);
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
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Global Plant Suggestions</Typography>
            {loadingAI && <Typography>Loading suggestions...</Typography>}
            {aiError && (
              <Typography color="error" sx={{ textAlign: 'center', width: '100%' }}>
                Could not fetch global plant suggestions. Here are some popular houseplants you can consider:
                <ul style={{ textAlign: 'left', margin: '8px 0 0 0', paddingLeft: 20 }}>
                  <li>Monstera Deliciosa</li>
                  <li>Philodendron</li>
                  <li>Rubber Plant</li>
                  <li>Spider Plant</li>
                  <li>Peace Lily</li>
                </ul>
              </Typography>
            )}
            {!loadingAI && !aiError && globalSuggestions.length > 0 && (
              <Grid container spacing={2}>
                {globalSuggestions.map((name, idx) => {
                  const local = products.find((p) => p.name.toLowerCase() === name.toLowerCase());
                  return (
                    <Grid item xs={12} sm={6} md={4} key={name+idx}>
                      {local ? (
                        <ProductCard plant={local} />
                      ) : (
                        <Card sx={{ p: 2, borderRadius: 2, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography variant="subtitle1" fontWeight={600}>{name}</Typography>
                          <Button variant="outlined" color="secondary" sx={{ mt: 2 }}>Notify me when available</Button>
                        </Card>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default PlantCompatibilityChecker;
