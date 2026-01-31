import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { FrontStore } from "../../Store/Store";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import { authAPI } from "../../Utils/api";
import { LuMapPin } from "react-icons/lu";

export const MyAccountSidebar = () => {
  const [uploading, setUploading] = useState(false);

  const OnChangeFile = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type.toLowerCase())) {
      toast.error("Please select a valid jpg, png, or webp image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await authAPI.uploadImage(formData);

      if (res.data.success) {
        toast.success(res.data.message || "Image Uploaded Successfully");
        const newAvatar = res.data.avatar;
        localStorage.setItem("avatar", JSON.stringify(newAvatar));
      } else {
        toast.error(res.data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during upload",
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const { islogin, Logout: handleLogout } = FrontStore();

  const name = JSON.parse(localStorage.getItem("name")) || "Guest";
  const email =
    JSON.parse(localStorage.getItem("email")) || "email@example.com";
  const avatar = JSON.parse(localStorage.getItem("avatar"));

  const logout = () => {
    handleLogout();
  };

  return (
    <div className="card bg-white shadow-md rounded-md sticky top-2.5">
      <div className="w-full p-5 flex items-center justify-center flex-col">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative flex items-center justify-center bg-gray-200">
          {uploading ? (
            <CircularProgress color="inherit" />
          ) : (
            <img
              src={avatar || "/user-image.png"}
              alt="user"
              className="h-full w-full object-cover"
            />
          )}

          {islogin && (
            <div className="overlay hover:opacity-100 opacity-0 transition-all duration-500 ease-in-out w-full h-full absolute top-0 left-0 z-50 bg-gray-600/50 flex items-center justify-center cursor-pointer">
              <CloudUploadIcon className="text-white text-sm" />
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={OnChangeFile}
                name="avatar"
              />
            </div>
          )}
        </div>
        <h1 className="font-semibold text-lg">{name}</h1>
        <h1 className="text-sm font-normal text-gray-500">{email}</h1>
      </div>

      <ul className="pb-5 bg-[#f1f1f1] myAccountTabs">
        <li className="w-full">
          <NavLink
            to="/my-account"
            end
            className={({ isActive }) => (isActive ? "isActive" : "")}
          >
            <Button className="!w-full !text-gray-600 !capitalize !rounded-none !flex !justify-start !text-left !py-2 !px-5 !gap-2">
              <PersonIcon fontSize="small" />
              My Profile
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/my-address"
            end
            className={({ isActive }) => (isActive ? "isActive" : "")}
          >
            <Button className="!w-full !text-gray-600 !capitalize !rounded-none !flex !justify-start !text-left !py-2 !px-5 !gap-2">
              <LuMapPin className="size-5" />
              My Address
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/my-list"
            end
            className={({ isActive }) => (isActive ? "isActive" : "")}
          >
            <Button className="!w-full !text-gray-600 !capitalize !rounded-none !flex !justify-start !text-left !py-2 !px-5 !gap-2">
              <FavoriteIcon fontSize="small" />
              My List
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/my-orders"
            end
            className={({ isActive }) => (isActive ? "isActive" : "")}
          >
            <Button className="!w-full !text-gray-600 !capitalize !rounded-none !flex !justify-start !text-left !py-2 !px-5 !gap-2">
              <ShoppingBagIcon fontSize="small" />
              My Orders
            </Button>
          </NavLink>
        </li>
        {islogin && (
          <li className="w-full">
            <Button
              onClick={logout}
              className="!w-full !text-gray-600 !capitalize !rounded-none !flex !justify-start !text-left !py-2 !px-5 !gap-2"
            >
              <Logout fontSize="small" />
              Logout
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
};
