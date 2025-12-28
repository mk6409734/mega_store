import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Productitems1 } from "../components/Productitems1";
import { IoGridSharp } from "react-icons/io5";
import { Button } from "@mui/material";
import { IoMdMenu } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ProductItemsListView } from "../components/ProductitemsListView";
import Pagination from "@mui/material/Pagination";

export const ProductListing = () => {
  const [itemView, setitemView] = useState("grid")
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <section className="py-5 pb-0">
      <div className="container mx-auto">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href=""
            className="link transition"
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href=""
            className="link transition"
          >
            Fashion
          </Link>
        </Breadcrumbs>
      </div>
      <div className="bg-white p-2 mt-4">
        <div className="container mx-auto flex gap-6">
          <div className="w-[20%] h-full bg-white ">
            <Sidebar />
          </div>
          <div className="rightContent w-[80%] py-3">
            <div className="bg-[#f1f1f1] p-2 w-full mb-4 rounded-md flex items-center justify-between">
              <div className="col1 flex items-center gap-3 itemViewActions">
                <Button
                  className={`!w-10 !h-10 !min-w-10 !rounded-full text-black ${
                    itemView === "list" && "active"
                  }`}
                  onClick={() => setitemView("list")}
                >
                  <IoMdMenu className="text-gray-700" />
                </Button>
                <Button
                  className={`!w-10 !h-10 !min-w-10 !rounded-full text-black ${
                    itemView === "grid" && "active"
                  }`}
                  onClick={() => setitemView("grid")}
                >
                  <IoGridSharp className="text-gray-700" />
                </Button>
                <span className="text-gray-700 pl-3 text-sm font-medium">
                  There are 27 Products.
                </span>
              </div>

              <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                <span className="text-gray-700 pl-3 text-sm font-medium">
                  Sort By
                </span>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !text-sm !text-black !capitalize !border !border-gray-400"
                >
                  Sales, Highest to lowest
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    Sales, Highest to lowest
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Relevance</MenuItem>
                  <MenuItem onClick={handleClose}>Name, A to Z</MenuItem>
                  <MenuItem onClick={handleClose}>Name, Z to A</MenuItem>
                  <MenuItem onClick={handleClose}>Price, low to high</MenuItem>
                  <MenuItem onClick={handleClose}>Price, High to Low</MenuItem>
                </Menu>
              </div>
            </div>

            <div
              className={`grid ${
                itemView === "grid"
                  ? "grid-cols-4 md:grid-cols-4"
                  : "grid-cols-1 md:grid-cols-1"
              }  gap-5`}
            >
              {itemView === "grid" ? (
                <>
                  <Productitems1 />
                  <Productitems1 />
                  <Productitems1 />
                  <Productitems1 />
                  <Productitems1 />
                  <Productitems1 />
                  <Productitems1 />
                </>
              ) : (
                <>
                  <ProductItemsListView />
                  <ProductItemsListView />
                  <ProductItemsListView />
                  <ProductItemsListView />
                  <ProductItemsListView />
                  <ProductItemsListView />
                  <ProductItemsListView />
                </>
              )}
            </div>
            <div className="flex items-center justify-center mt-10">
              <Pagination count={10} showFirstButton showLastButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
