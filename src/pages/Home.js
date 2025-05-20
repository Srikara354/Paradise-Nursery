import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent, Grid, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
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
    </Container>
  );
};

export default Home;