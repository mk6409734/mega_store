import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
// Import Zustand store
import { adminStore } from "../../Store/Store";
import { Link, useNavigate } from "react-router-dom";

export const MyAccUI = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  // Access Zustand store state and actions
  const { user, islogin, Logout: handleLogout } = adminStore();

  const name = JSON.parse(localStorage.getItem("name")) || "Guest";
  const email =
    JSON.parse(localStorage.getItem("email")) || "email@example.com";
  const avatar = localStorage.getItem("avatar")
    ? JSON.parse(localStorage.getItem("avatar"))
    : null;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    handleLogout();
    handleClose();
    navigate("/login");
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="rounded-full w-10 h-10 overflow-hidden cursor-pointer"
      >
        {islogin && avatar ? (
          <img
            src={avatar}
            alt="user"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="bg-gray-700 rounded-full w-full h-full flex items-center justify-center">
            <span className="text-2xl font-semibold text-white">
              {(name[0] || "").toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
        <MenuItem className="!bg-white">
          <div className="flex items-center gap-3">
            <div className="rounded-full w-10 h-10 overflow-hidden cursor-pointer">
              {islogin && (
                <img
                  src={avatar || "./avatar.jpg"}
                  alt="user"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="info flex flex-col">
              <h1 className="text-lg font-medium leading-5">
                {name || "Admin User"}
              </h1>
              <p className="text-sm font-normal opacity-70">
                {email || "admin@example.com"}
              </p>
            </div>
          </div>
        </MenuItem>
        <Divider />
        <Link to="/profile">
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
