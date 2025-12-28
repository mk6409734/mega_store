import React, { useState } from "react";
import Button from "@mui/material/Button";
import { CgMenuLeftAlt } from "react-icons/cg";
import { RiMenuFill } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import { FaRegBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import "./header.css";
import { MyAccUI } from "./MyAccUI";
// Import Zustand store
import { adminStore } from "../../Store/Store";
import { Link } from "react-router-dom";

import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

export const Header = () => {
  // Access Zustand store state and actions
  const { isLogin, isSidebarCollapsed, toggleSidebar, setDarkMode, darkmode } =
    adminStore();

  return (
    <header className="py-2 dark:bg-zinc-700 bg-white border-b border-gray-300 px-5 shadow-md flex items-center justify-between">
      <div
        className={`part1 flex gap-3 
        } `}
        // className={`part1 flex gap-3 ${
        //   isSidebarCollapsed ? "pl-2 md:pl-20" : "pl-2 md:pl-68"
        // } `}
      >
        <Button
          onClick={toggleSidebar}
          className="!w-10 !h-10 !rounded-full !min-w-10 dark:!text-white !text-gray-800"
        >
          {isSidebarCollapsed ? (
            <RiMenuFill className="text-gray-800 dark:text-white text-xl" />
          ) : (
            <CgMenuLeftAlt className="text-gray-800 dark:text-white text-xl" />
          )}
        </Button>
        <Button className="!w-10 !h-10 !rounded-full !min-w-10 !text-gray-800">
          <IoSearch className="text-gray-800 dark:text-white text-xl font-semibold" />
        </Button>
      </div>

      <div className="part2 w-[40%] flex items-center justify-end gap-5">
        <Button className="!w-10 !h-10 !rounded-full !min-w-10 !text-gray-800">
          <Badge badgeContent={4}>
            <FaRegBell className="text-gray-800 dark:text-white text-xl" />
          </Badge>
        </Button>

        <Button
          className="!rounded-full !p-3 !w-12 !h-12 !min-w-12 !text-gray-700"
          onClick={() => setDarkMode(darkmode === "dark" ? "light" : "dark")}
        >
          {darkmode === "dark" ? (
            <IoSunnyOutline className="text-xl text-gray-200" />
          ) : (
            <IoMoonOutline className="text-xl text-gray-700" />
          )}
        </Button>

        {/* Conditionally render based on login state */}
        {isLogin ? (
          <MyAccUI />
        ) : (
          <Link to="/login">
            <Button
              className="!px-4 !rounded-full"
              variant="contained"
              size="small"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};
