import * as React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import "./NavMenu.scss";

const NavTabs = () => {
  const { isLoggedIn } = useSelector((state) => state.users);

  return (
    <Box sx={{ width: "100%", display: { xs: 'none', sm: "block" } }} >
      <nav>
        <ul className="nav-menu__list">
          <li>
            <NavLink
              to=""
              className={({ isActive }) => (isActive ? "activeLink" : "link")}
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink
                to="/emails"
                className={({ isActive }) => (isActive ? "activeLink" : "link")}
              >
                Emails
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </Box>
  );
};

export default NavTabs;
