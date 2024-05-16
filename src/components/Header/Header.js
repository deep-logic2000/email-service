import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Button,
  Box,
  Container,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavMenu from "../NavTabs/NavMenu";
import { useAuth } from "../AuthProvider/AuthProvider";

import "./Header.scss";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.users);

  const location = useLocation();

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleWrite = () => {
    navigate("/email");
  };

  return (
    <div className="headerWrapper">
      <Container maxWidth="lg" fixed>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <IconButton
              size="large"
              aria-label="appBar menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
              sx={{ display: { xs: "block", sm: "none" } }}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", sm: "none" },
            }}>
            <MenuItem onClick={handleCloseNavMenu} className="menuItem">
              <a href="/">
                <Typography textAlign="center">Home</Typography>
              </a>
            </MenuItem>
            {isLoggedIn && (
              <MenuItem onClick={handleCloseNavMenu} className="menuItem">
                <a href="/emails">
                  <Typography textAlign="center" className="menuItem">
                    Emails
                  </Typography>
                </a>
              </MenuItem>
            )}
          </Menu>

          <Box>
            <NavMenu />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            {isLoggedIn && (
              <Box>
                {location.pathname !== "/email" && (
                  <Button
                    variant="contained"
                    onClick={handleWrite}
                    sx={{ marginRight: "10px" }}>
                    Write Email
                  </Button>
                )}
                <Button variant="contained" onClick={handleLogout}>
                  LogOut
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Header;
