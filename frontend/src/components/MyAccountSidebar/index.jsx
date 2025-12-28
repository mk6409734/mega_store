import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export const MyAccountSidebar = () => {
  return (
    <div className="card bg-white shadow-md rounded-md sticky top-2.5">
      <div className="w-full p-5 flex items-center justify-center flex-col">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative">
          <img
            src="./user.jpg"
            alt="user"
            className="h-full w-full object-cover"
          />

          <div className="overlay hover:opacity-100  opacity-0 transition-all duration-500 ease-in-out w-full h-full absolute top-0 left-0 z-50  bg-gray-600/50 flex items-center justify-center cursor-pointer">
            <CloudUploadIcon className="text-white text-sm" />

            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0"
            />
          </div>
        </div>
        <h1>Mohit Gautam</h1>
        <h1 className="text-sm font-normal">mk945909@gmail.com</h1>
      </div>

      <ul className="pb-5 bg-[#f1f1f1] myAccountTabs">
        <li className="w-full">
          <NavLink to="/my-account" exact={true} activeClassName="isActive">
            <Button className="!w-full !text-gray-600 !capitalize !rounded-none !flex !justify-start !text-left !py-2 !px-5 !gap-2">
              <PersonIcon fontSize="small" />
              My Profile
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/my-list" exact={true} activeClassName="isActive">
            <Button className="!w-full !text-gray-600 !capitalize !rounded-none !flex !justify-start !text-left !py-2 !px-5 !gap-2">
              <FavoriteIcon fontSize="small" />
              My List
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/my-orders" exact={true} activeClassName="isActive">
            <Button className="!w-full !text-gray-600 !capitalize !rounded-none !flex !justify-start !text-left !py-2 !px-5 !gap-2">
              <ShoppingBagIcon fontSize="small" />
              My Orders
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <Button className="!w-full !text-gray-600 !capitalize !rounded-none !flex !justify-start !text-left !py-2 !px-5 !gap-2">
            <Logout fontSize="small" />
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
};
