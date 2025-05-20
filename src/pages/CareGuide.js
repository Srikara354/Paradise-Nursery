import React from "react";
import { useParams } from "react-router-dom";
import careGuides from "./careGuides";
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
import { Card, CardMedia, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Map plant names to images for display
const plantImages = {
  "Aloe Vera": AloeVera,
  "Snake Plant": SnakePlant,
  "Peace Lily": PeaceLily,
  "Spider Plant": SpiderPlant,
  "Pothos": Pothos,
  "ZZ Plant": ZZPlant,
  "Rubber Plant": RubberPlant,
  "Fiddle Leaf Fig": FiddleLeafFig,
  "Jade Plant": JadePlant,
  "Boston Fern": BostonFern,
  "Calathea": Calathea,
};

const CareGuide = () => {
  const { plantName } = useParams();
  const tips = careGuides[plantName];
  const image = plantImages[plantName];

  if (!tips) {
    return <Box sx={{ mt: 6, textAlign: 'center' }}><Typography variant="h6" color="error">Care guide not found.</Typography></Box>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6 }}>
      <Card elevation={4} sx={{ borderRadius: 4, p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          {image && (
            <CardMedia
              component="img"
              image={image}
              alt={plantName}
              sx={{ width: 180, height: 180, objectFit: 'cover', borderRadius: 3, mb: 2, border: '3px solid #b2dfdb' }}
            />
          )}
          <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
            {plantName} Care Guide
          </Typography>
        </Box>
        <List>
          {tips.map((tip, idx) => (
            <ListItem key={idx}>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={tip} />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
};

export default CareGuide;
