import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";
import { RiProductHuntFill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Collapse } from "react-collapse";
import "./index.css";

export const MobileSidebar = ({ isCollapsed, setIsSidebarCollapsed }) => {
  const [subMenuIndex, setSubMenuIndex] = useState(false);
  const sidebarRef = useRef(null);

  const isOpenSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(false);
    } else {
      setSubMenuIndex(index);
    }
  };

  const handleClose = () => {
    setIsSidebarCollapsed(false);
  };

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isCollapsed
      ) {
        setIsSidebarCollapsed(false);
      }
    };

    if (isCollapsed) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCollapsed, setIsSidebarCollapsed]);

  return (
    <div
      ref={sidebarRef}
      className={`w-68 md:hidden ${
        !!isCollapsed ? "left-0" : "-left-68"
      } bg-white shadow-md border-r border-gray-200 h-screen p-2 flex flex-col transition-all duration-500 ease-in-out`}
    >
      <div className="flex justify-between items-center p-2 cursor-pointer">
        <h1 className="text-2xl font-semibold">Navigation</h1>
        <Button className="!text-gray-400 !rounded-full !min-w-10 !w-10 !h-10">
          <IoMdClose onClick={handleClose} className="text-xl text-gray-600" />
        </Button>
      </div>

      <ul className="mt-5">
        <li className="mb-2">
          <Button className="!flex !justify-start !items-center !gap-3 !text-gray-500 !capitalize !text-base !w-full !py-3 !pl-3">
            <RxDashboard className="text-lg" />
            <span className="">Dashboard</span>
          </Button>
        </li>
        <li className="mb-2">
          <Button
            onClick={() => isOpenSubMenu(1)}
            className="!flex !justify-start !items-center !gap-3 !text-gray-500 !capitalize !text-base !w-full !py-3 !pl-3"
          >
            <FaRegImage className="text-lg" />
            <span>Home Slides</span>

            <span className="dropdown-arrow">
              <FaAngleDown
                className={`${
                  subMenuIndex === 1
                    ? "rotate-180 transition-all duration-300"
                    : "rotate-0 transition-all duration-300"
                }`}
              />
            </span>
          </Button>

          <Collapse isOpened={subMenuIndex === 1 ? true : false}>
            <ul className="submenu">
              <li className="w-full">
                <Button className="submenu-item">
                  <span className="submenu-dot"></span>
                  Home Banner list
                </Button>
              </li>
              <li className="w-full">
                <Button className="submenu-item">
                  <span className="submenu-dot"></span>
                  Add Home Banner Slide
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className="mb-2">
          <Button className="!flex !justify-start !items-center !gap-3 !text-gray-500 !capitalize !text-base !w-full !py-3 !pl-3">
            <FiUsers className="text-lg" />
            <span>Users</span>
          </Button>
        </li>
        <li className="mb-2">
          <Button
            onClick={() => isOpenSubMenu(2)}
            className="!flex !justify-start !items-center !gap-3 !text-gray-500 !capitalize !text-base !w-full !py-3 !pl-3"
          >
            <RiProductHuntFill className="text-lg" />
            <span>Products</span>

            <span className="dropdown-arrow">
              <FaAngleDown
                className={`${
                  subMenuIndex === 2
                    ? "rotate-180 transition-all duration-300"
                    : "rotate-0 transition-all duration-300"
                }`}
              />
            </span>
          </Button>

          <Collapse isOpened={subMenuIndex === 2 ? true : false}>
            <ul className="submenu">
              <li className="w-full">
                <Button className="submenu-item">
                  <span className="submenu-dot"></span>
                  Product list
                </Button>
              </li>
              <li className="w-full">
                <Button className="submenu-item">
                  <span className="submenu-dot"></span>
                  Product upload
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className="mb-2">
          <Button
            onClick={() => isOpenSubMenu(3)}
            className="!flex !justify-start !items-center !gap-3 !text-gray-500 !capitalize !text-base !w-full !py-3 !pl-3"
          >
            <TbCategory2 className="text-lg" />
            <span>Category</span>

            <span className="dropdown-arrow">
              <FaAngleDown
                className={`${
                  subMenuIndex === 3
                    ? "rotate-180 transition-all duration-300"
                    : "rotate-0 transition-all duration-300"
                }`}
              />
            </span>
          </Button>

          <Collapse isOpened={subMenuIndex === 3 ? true : false}>
            <ul className="submenu">
              <li className="w-full">
                <Button className="submenu-item">
                  <span className="submenu-dot"></span>
                  Category list
                </Button>
              </li>
              <li className="w-full">
                <Button className="submenu-item">
                  <span className="submenu-dot"></span>
                  Add a Category
                </Button>
              </li>
              <li className="w-full">
                <Button className="submenu-item">
                  <span className="submenu-dot"></span>
                  Sub Category list
                </Button>
              </li>
              <li className="w-full">
                <Button className="submenu-item">
                  <span className="submenu-dot"></span>
                  Add a Sub Category
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className="mb-2">
          <Button className="!flex !justify-start !items-center !gap-3 !text-gray-500 !capitalize !text-base !w-full !py-3 !pl-3">
            <IoBagCheckOutline className="text-lg" />
            <span>Orders</span>
          </Button>
        </li>
        <li className="mb-2">
          <Button className="!flex !justify-start !items-center !gap-3 !text-gray-500 !capitalize !text-base !w-full !py-3 !pl-3">
            <IoLogOutOutline className="text-lg" />
            <span>Logout</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};
