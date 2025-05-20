import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="sticky" color="primary" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <span className="navbar-logo">
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: 600,
              display: "inline-block",
              verticalAlign: "middle",
            }}
          >
            Paradise Nursery
          </Typography>
        </span>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/products"
          >
            Products
          </Button>
          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
          >
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={toggleDarkMode}
            sx={{ ml: 1 }}
          >
            {darkMode ? <DarkModeIcon /> : <WbSunnyIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;