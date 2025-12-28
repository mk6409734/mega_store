import React, { useState } from "react";
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
import { Collapse } from "react-collapse";
import "./index.css";
import { adminStore } from "../../Store/Store";
import { AddCategory } from "../AddCategory/AddCategory";
import FullDialog from "../FullDialog/FullDialog";
import { AddProduct } from "../AddProduct/AddProduct";
import { AddSubCategory } from "../AddSubCategory/AddSubCategory";

export const Sidebar = () => {
  const [subMenuIndex, setSubMenuIndex] = useState(false);
  const { isSidebarCollapsed } = adminStore();
  const isOpenSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(false);
    } else {
      setSubMenuIndex(index);
    }
  };
  const { handleClickOpen } = adminStore();
  return (
    <div
      className={`h-screen py-4 px-3 flex-col border-r dark:border-zinc-600 border-gray-300 dark:bg-zinc-700 bg-white transition-all duration-500 hidden md:flex  ${
        isSidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div
        className={`flex items-center justify-start ${
          isSidebarCollapsed ? " " : "px-2 py-2"
        }`}
      >
        <Link to="/">
          {isSidebarCollapsed ? (
            <img
              src="/logo-only.png"
              className="w-16 transition-all duration-500"
            />
          ) : (
            <img src="/logo.png" className="w-34 transition-all duration-500" />
          )}
        </Link>
      </div>

      <ul className="mt-5">
        <li
          className={`mb-2 ${
            isSidebarCollapsed ? "flex items-center justify-center" : ""
          }`}
        >
          <Link to="/">
            <Button
              className={`sidebar-menu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500 ${
                isSidebarCollapsed
                  ? "collapsed !min-w-10 !w-10 !h-10 !rounded-full"
                  : "expanded"
              }`}
            >
              <RxDashboard className="menu-icon" />
              <span
                className={`menu-text ${
                  isSidebarCollapsed ? "hidden" : "visible"
                }`}
              >
                Dashboard
              </span>
            </Button>
          </Link>
        </li>
        <li
          className={`mb-2 ${
            isSidebarCollapsed ? "flex items-center justify-center" : ""
          }`}
        >
          <Button
            onClick={() => !isSidebarCollapsed && isOpenSubMenu(1)}
            className={`sidebar-menu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500 ${
              isSidebarCollapsed
                ? "collapsed !min-w-10 !w-10 !h-10 !rounded-full"
                : "expanded"
            }`}
          >
            <FaRegImage className="menu-icon" />
            <span
              className={`menu-text ${
                isSidebarCollapsed ? "hidden" : "visible"
              }`}
            >
              Home Slides
            </span>
            {!isSidebarCollapsed && (
              <span className="dropdown-arrow">
                <FaAngleDown
                  className={`${
                    subMenuIndex === 1
                      ? "rotate-180 transition-all duration-300"
                      : "rotate-0 transition-all duration-300"
                  }`}
                />
              </span>
            )}
          </Button>

          {!isSidebarCollapsed && (
            <Collapse isOpened={subMenuIndex === 1 ? true : false}>
              <ul className="submenu">
                <li className="w-full">
                  <Link to="/homeslider/list">
                    <Button className="submenu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500">
                      <span className="submenu-dot"></span>
                      Home Banner list
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button className="submenu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500">
                    <span className="submenu-dot"></span>
                    Add Home Banner Slide
                  </Button>
                </li>
              </ul>
            </Collapse>
          )}
        </li>
        <li
          className={`mb-2 ${
            isSidebarCollapsed ? "flex items-center justify-center" : ""
          }`}
        >
          <Link to="/users">
            <Button
              className={`sidebar-menu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500 ${
                isSidebarCollapsed
                  ? "collapsed !min-w-10 !w-10 !h-10 !rounded-full"
                  : "expanded"
              }`}
            >
              <FiUsers className="menu-icon" />
              <span
                className={`menu-text ${
                  isSidebarCollapsed ? "hidden" : "visible"
                }`}
              >
                Users
              </span>
            </Button>
          </Link>
        </li>
        <li
          className={`mb-2 ${
            isSidebarCollapsed ? "flex items-center justify-center" : ""
          }`}
        >
          <Button
            onClick={() => !isSidebarCollapsed && isOpenSubMenu(2)}
            className={`sidebar-menu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500 ${
              isSidebarCollapsed
                ? "collapsed !min-w-10 !w-10 !h-10 !rounded-full"
                : "expanded"
            }`}
          >
            <RiProductHuntFill className="menu-icon" />
            <span
              className={`menu-text ${
                isSidebarCollapsed ? "hidden" : "visible"
              }`}
            >
              Products
            </span>
            {!isSidebarCollapsed && (
              <span className="dropdown-arrow">
                <FaAngleDown
                  className={`${
                    subMenuIndex === 2
                      ? "rotate-180 transition-all duration-300"
                      : "rotate-0 transition-all duration-300"
                  }`}
                />
              </span>
            )}
          </Button>
          {!isSidebarCollapsed && (
            <Collapse isOpened={subMenuIndex === 2 ? true : false}>
              <ul className="submenu">
                <li className="w-full">
                  <Link to="/products">
                    <Button className="submenu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500">
                      <span className="submenu-dot"></span>
                      Product list
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    onClick={() =>
                      handleClickOpen(AddProduct, { title: "Add Product" })
                    }
                    className="submenu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500"
                  >
                    <span className="submenu-dot"></span>
                    Product upload
                  </Button>
                </li>
              </ul>
            </Collapse>
          )}
        </li>
        <li
          className={`mb-2 ${
            isSidebarCollapsed ? "flex items-center justify-center" : ""
          }`}
        >
          <Button
            onClick={() => !isSidebarCollapsed && isOpenSubMenu(3)}
            className={`sidebar-menu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500 ${
              isSidebarCollapsed
                ? "collapsed !min-w-10 !w-10 !h-10 !rounded-full"
                : "expanded"
            }`}
          >
            <TbCategory2 className="menu-icon" />
            <span
              className={`menu-text ${
                isSidebarCollapsed ? "hidden" : "visible"
              }`}
            >
              Category
            </span>
            {!isSidebarCollapsed && (
              <span className="dropdown-arrow">
                <FaAngleDown
                  className={`${
                    subMenuIndex === 3
                      ? "rotate-180 transition-all duration-300"
                      : "rotate-0 transition-all duration-300"
                  }`}
                />
              </span>
            )}
          </Button>
          {!isSidebarCollapsed && (
            <Collapse isOpened={subMenuIndex === 3 ? true : false}>
              <ul className="submenu">
                <li className="w-full">
                  <Link to="/category/list">
                    <Button className="submenu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500">
                      <span className="submenu-dot"></span>
                      Category list
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    onClick={() =>
                      handleClickOpen(AddCategory, {
                        title: "Add New Category",
                      })
                    }
                    className="submenu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500"
                  >
                    <span className="submenu-dot"></span>
                    Add a Category
                  </Button>
                </li>
                <li className="w-full">
                  <Link to="/subcategory/list">
                    <Button className="submenu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500">
                      <span className="submenu-dot"></span>
                      Sub Category list
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    onClick={() =>
                      handleClickOpen(AddSubCategory, {
                        title: "Add Sub New Category",
                      })
                    }
                    className="submenu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500"
                  >
                    <span className="submenu-dot"></span>
                    Add a Sub Category
                  </Button>
                </li>
              </ul>
            </Collapse>
          )}
        </li>
        <li
          className={`mb-2 ${
            isSidebarCollapsed ? "flex items-center justify-center" : ""
          }`}
        >
          <Link to="/orders">
            <Button
              className={`sidebar-menu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500 ${
                isSidebarCollapsed
                  ? "collapsed !min-w-10 !w-10 !h-10 !rounded-full"
                  : "expanded"
              }`}
            >
              <IoBagCheckOutline className="menu-icon" />
              <span
                className={`menu-text ${
                  isSidebarCollapsed ? "hidden" : "visible"
                }`}
              >
                Orders
              </span>
            </Button>
          </Link>
        </li>
        <li
          className={`mb-2 ${
            isSidebarCollapsed ? "flex items-center justify-center" : ""
          }`}
        >
          <Button
            className={`sidebar-menu-item dark:!text-white !text-gray-500 hover:!bg-white hover:!text-gray-500 ${
              isSidebarCollapsed
                ? "collapsed !min-w-10 !w-10 !h-10 !rounded-full"
                : "expanded"
            }`}
          >
            <IoLogOutOutline className="menu-icon" />
            <span
              className={`menu-text ${
                isSidebarCollapsed ? "hidden" : "visible"
              }`}
            >
              Logout
            </span>
          </Button>
        </li>
      </ul>
      {/* Single FullDialog instance that renders whatever component the store requests */}
      <FullDialog />
    </div>
  );
};
