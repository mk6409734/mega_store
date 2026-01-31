import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Logout from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FrontStore } from "../../Store/Store";

export const UserAccountDetails = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { islogin, Logout: handleLogout } = FrontStore();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleLogout();
    handleClose();
  };

  if (islogin === true) {
    const name = JSON.parse(localStorage.getItem("name"));
    const email = JSON.parse(localStorage.getItem("email"));
    const avatar = JSON.parse(localStorage.getItem("avatar"));

    return (
      <>
        <Button
          onClick={handleClick}
          className="!flex !items-center !gap-3 !text-gray-500"
        >
          <div className="w-10 h-10 min-w-[40px] rounded-full bg-white border border-gray-300 p-0 overflow-hidden">
            <img
              src={avatar || "/user-image.png"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left !lowercase">
            <h1 className="text-sm text-primary">{name || "Guest"}</h1>
            <span className="text-sm font-normal">{email || "No email"}</span>
          </div>
        </Button>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link to="/my-account">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              My account
            </MenuItem>
          </Link>
          <Link to="/my-orders">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ShoppingBagIcon fontSize="small" />
              </ListItemIcon>
              Orders
            </MenuItem>
          </Link>
          <Divider />
          <Link to="/my-list">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              My List
            </MenuItem>
          </Link>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  }
};
