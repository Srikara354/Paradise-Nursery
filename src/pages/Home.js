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

  // --- Customer Reviews & Ratings ---
  const getInitialReviews = () => {
    try {
      return JSON.parse(localStorage.getItem("reviews") || "[]");
    } catch {
      return [];
    }
  };
  const [reviews, setReviews] = useState(getInitialReviews());
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [editingReviewIdx, setEditingReviewIdx] = useState(null);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText) return;
    if (editingReviewIdx !== null) {
      // Edit existing review
      const updated = reviews.map((r, i) =>
        i === editingReviewIdx ? { ...r, text: reviewText, rating: reviewRating } : r
      );
      setReviews(updated);
      localStorage.setItem("reviews", JSON.stringify(updated));
      setEditingReviewIdx(null);
    } else {
      // Add new review
      const newReview = { text: reviewText, rating: reviewRating, date: new Date().toLocaleString() };
      const updated = [newReview, ...reviews];
      setReviews(updated);
      localStorage.setItem("reviews", JSON.stringify(updated));
    }
    setReviewText("");
    setReviewRating(5);
  };

  const handleEditReview = (idx) => {
    setEditingReviewIdx(idx);
    setReviewText(reviews[idx].text);
    setReviewRating(reviews[idx].rating);
  };

  const handleDeleteReview = (idx) => {
    const updated = reviews.filter((_, i) => i !== idx);
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
    if (editingReviewIdx === idx) {
      setEditingReviewIdx(null);
      setReviewText("");
      setReviewRating(5);
    }
  };

  // --- User-Uploaded Photos ---
  const getInitialPhotos = () => {
    try {
      return JSON.parse(localStorage.getItem("photos") || "[]");
    } catch {
      return [];
    }
  };
  const [photos, setPhotos] = useState(getInitialPhotos());
  const [photoFile, setPhotoFile] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const newPhoto = { src: ev.target.result, date: new Date().toLocaleString() };
      const updated = [newPhoto, ...photos];
      setPhotos(updated);
      localStorage.setItem("photos", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
    setPhotoFile(null);
  };

  const handleDeletePhoto = (idx) => {
    const updated = photos.filter((_, i) => i !== idx);
    setPhotos(updated);
    localStorage.setItem("photos", JSON.stringify(updated));
  };

  // --- Community Forum ---
  const getInitialPosts = () => {
    try {
      return JSON.parse(localStorage.getItem("forumPosts") || "[]");
    } catch {
      return [];
    }
  };
  const [forumPosts, setForumPosts] = useState(getInitialPosts());
  const [forumText, setForumText] = useState("");
  const [editingForumIdx, setEditingForumIdx] = useState(null);

  const handleForumSubmit = (e) => {
    e.preventDefault();
    if (!forumText) return;
    if (editingForumIdx !== null) {
      // Edit existing post
      const updated = forumPosts.map((p, i) =>
        i === editingForumIdx ? { ...p, text: forumText } : p
      );
      setForumPosts(updated);
      localStorage.setItem("forumPosts", JSON.stringify(updated));
      setEditingForumIdx(null);
    } else {
      // Add new post
      const newPost = { text: forumText, date: new Date().toLocaleString() };
      const updated = [newPost, ...forumPosts];
      setForumPosts(updated);
      localStorage.setItem("forumPosts", JSON.stringify(updated));
    }
    setForumText("");
  };

  const handleEditForum = (idx) => {
    setEditingForumIdx(idx);
    setForumText(forumPosts[idx].text);
  };

  const handleDeleteForum = (idx) => {
    const updated = forumPosts.filter((_, i) => i !== idx);
    setForumPosts(updated);
    localStorage.setItem("forumPosts", JSON.stringify(updated));
    if (editingForumIdx === idx) {
      setEditingForumIdx(null);
      setForumText("");
    }
  };

  // State for toggling 'view all' for reviews, photos, and forum
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllForum, setShowAllForum] = useState(false);

  // Helper to render colored stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let color = '#e0e0e0'; // default gray
      if (i <= rating) {
        if (rating >= 4) color = '#43a047'; // green
        else if (rating === 3) color = '#fbc02d'; // yellow
        else color = '#e53935'; // red
      }
      stars.push(
        <svg key={i} width="22" height="22" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
          <polygon points="12,2 15,9 22,9.3 17,14.1 18.5,21 12,17.5 5.5,21 7,14.1 2,9.3 9,9" fill={color} stroke="#888" strokeWidth="0.5" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Decorative animated SVG plant */}
      <svg className="animated-plant" viewBox="0 0 64 64" fill="none">
        <ellipse cx="32" cy="56" rx="18" ry="6" fill="#b2dfdb"/>
        <path d="M32 56 Q30 40 24 32 Q18 24 24 12 Q30 0 32 12 Q34 0 40 12 Q46 24 40 32 Q34 40 32 56 Z" fill="#81c784" stroke="#388e3c" strokeWidth="2"/>
        <circle cx="32" cy="20" r="3" fill="#388e3c"/>
      </svg>
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
            <Card elevation={2} className="glass">
              <CardContent>
                <Typography variant="subtitle1" fontWeight={500}>
                  <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Aloe Vera - Easy Care</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card elevation={2} className="glass">
              <CardContent>
                <Typography variant="subtitle1" fontWeight={500}>
                  <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Snake Plant - Low Light</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card elevation={2} className="glass">
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
        <Card elevation={3} className="glass">
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

      {/* Customer Reviews & Ratings Section */}
      <Box sx={{ mt: 8 }}>
        <Card elevation={3} className="glass" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Customer Reviews & Ratings</Typography>
            <Box component="form" onSubmit={handleReviewSubmit} sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Rating</InputLabel>
                <Select value={reviewRating} label="Rating" onChange={e => setReviewRating(Number(e.target.value))}>
                  {[5,4,3,2,1].map(r => <MenuItem key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel shrink htmlFor="review-text">Your Review</InputLabel>
                <textarea id="review-text" value={reviewText} onChange={e => setReviewText(e.target.value)} rows={3} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', fontFamily: 'inherit' }} required />
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                {editingReviewIdx !== null ? 'Update Review' : 'Submit Review'}
              </Button>
              {editingReviewIdx !== null && (
                <Button onClick={() => { setEditingReviewIdx(null); setReviewText(""); setReviewRating(5); }} color="secondary" variant="outlined">Cancel Edit</Button>
              )}
            </Box>
            {reviews.length === 0 ? (
              <Typography color="text.secondary">No reviews yet. Be the first to review!</Typography>
            ) : (
              <Box>
                {(showAllReviews ? reviews : reviews.slice(0,2)).map((r, i) => (
                  <Card key={i} sx={{ mb: 2, background: '#f9f9f9' }} className="glass">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {renderStars(r.rating)}
                        <Typography variant="subtitle2" color="primary.main" sx={{ ml: 1 }}>{r.rating} ★</Typography>
                      </Box>
                      <Typography variant="body1">{r.text}</Typography>
                      <Typography variant="caption" color="text.secondary">{r.date}</Typography>
                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        <Button size="small" color="primary" variant="outlined" onClick={() => handleEditReview(i)}>Edit</Button>
                        <Button size="small" color="error" variant="outlined" onClick={() => handleDeleteReview(i)}>Delete</Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
                {reviews.length > 2 && (
                  <Button variant="text" onClick={() => setShowAllReviews(v => !v)} sx={{ mb: 2 }}>
                    {showAllReviews ? 'Show Less' : 'View All'}
                  </Button>
                )}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* User-Uploaded Photos Section */}
        <Card elevation={3} className="glass" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>User-Uploaded Photos</Typography>
            <Box component="form" sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="contained" component="label" color="secondary">
                Upload Photo
                <input type="file" accept="image/*" hidden onChange={handlePhotoUpload} />
              </Button>
            </Box>
            {photos.length === 0 ? (
              <Typography color="text.secondary">No photos uploaded yet.</Typography>
            ) : (
              <Grid container spacing={2}>
                {(showAllPhotos ? photos : photos.slice(0,2)).map((p, i) => (
                  <Grid item xs={6} sm={4} md={3} key={i}>
                    <Card className="glass">
                      <img src={p.src} alt="User Plant" style={{ width: '100%', borderRadius: 8, maxHeight: 180, objectFit: 'cover' }} />
                      <CardContent>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>{p.date}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                          <Button size="small" color="error" variant="outlined" onClick={() => handleDeletePhoto(i)}>Delete</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                {photos.length > 2 && (
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                      <Button variant="text" onClick={() => setShowAllPhotos(v => !v)}>
                        {showAllPhotos ? 'Show Less' : 'View All'}
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            )}
          </CardContent>
        </Card>

        {/* Community Forum Section */}
        <Card elevation={3} className="glass">
          <CardContent>
            <Typography variant="h5" gutterBottom>Community Forum</Typography>
            <Box component="form" onSubmit={handleForumSubmit} sx={{ mb: 2, display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel shrink htmlFor="forum-text">Share a tip, issue, or experience</InputLabel>
                <textarea id="forum-text" value={forumText} onChange={e => setForumText(e.target.value)} rows={2} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', fontFamily: 'inherit' }} required />
              </FormControl>
              <Button type="submit" variant="contained" color="success">{editingForumIdx !== null ? 'Update Post' : 'Post'}</Button>
              {editingForumIdx !== null && (
                <Button onClick={() => { setEditingForumIdx(null); setForumText(""); }} color="secondary" variant="outlined">Cancel Edit</Button>
              )}
            </Box>
            {forumPosts.length === 0 ? (
              <Typography color="text.secondary">No posts yet. Start the conversation!</Typography>
            ) : (
              <Box>
                {(showAllForum ? forumPosts : forumPosts.slice(0,2)).map((p, i) => (
                  <Card key={i} sx={{ mb: 2, background: '#f6fff6' }} className="glass">
                    <CardContent>
                      <Typography variant="body1">{p.text}</Typography>
                      <Typography variant="caption" color="text.secondary">{p.date}</Typography>
                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        <Button size="small" color="primary" variant="outlined" onClick={() => handleEditForum(i)}>Edit</Button>
                        <Button size="small" color="error" variant="outlined" onClick={() => handleDeleteForum(i)}>Delete</Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
                {forumPosts.length > 2 && (
                  <Button variant="text" onClick={() => setShowAllForum(v => !v)} sx={{ mb: 2 }}>
                    {showAllForum ? 'Show Less' : 'View All'}
                  </Button>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;