import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoIosGitCompare } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { FaCartShopping } from "react-icons/fa6";
import { MyContext } from "../App";

export const ProductItemsListView = (props) => {
  const { setOpenProductDialog } = useContext(MyContext);
  return (
    <div className="rounded-md overflow-hidden border border-gray-300 bg-gray-50 shadow-md flex items-center">
      <div className="group w-[25%]  rounded-t-md relative">
        <Link to="/">
          <div className="h-60 overflow-hidden relative">
            <img
              src={
                "https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
              }
              alt="Productitem"
              className="w-full"
            />
            <img
              src={
                "https://serviceapi.spicezgold.com/download/1742463096956_hbhb2.jpg"
              }
              alt="Productitem"
              className="w-full transition-all duration-700 absolute top-0 left-0 opacity-0
             group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        </Link>
        <span className="flex items-center absolute top-2.5 left-2.5 z-50 bg-[#ff5252] text-white rounded-md p-1 text-sm">
          -10%
        </span>

        <div className="absolute -top-48 right-1.5 z-50 flex flex-col items-center gap-4 w-12 transition-all duration-300 group-hover:top-4 opacity-0 group-hover:opacity-100">
          <Tooltip title="Add to cart" placement="left-start">
            <Button className="!w-8 !h-8 !min-w-8 !rounded-full !bg-white hover:!bg-[#ff5252]  group">
              <IoMdHeartEmpty className="text-sm !text-black group-hover:!text-black hover:!text-white" />
            </Button>
          </Tooltip>
          <Tooltip title="Compare" placement="left-start">
            <Button className="!w-8 !h-8 !min-w-8 !rounded-full !bg-white hover:!bg-[#ff5252]  group">
              <IoIosGitCompare className="text-sm !text-black group-hover:!text-black hover:!text-white" />
            </Button>
          </Tooltip>
          <Tooltip title="zoom" placement="left-start">
            <Button
              onClick={() => setOpenProductDialog(true)}
              className="!w-8 !h-8 !min-w-8 !rounded-full !bg-white hover:!bg-[#ff5252]  group"
            >
              <MdOutlineZoomOutMap className="text-sm !text-black group-hover:!text-black hover:!text-white" />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="p-3 py-5 px-8 w-[75%]">
        <h3 className="text-lg">
          <Link to="/" className="link transition-all">
            CLAFOUTIS
          </Link>
        </h3>
        <p className="text-xl my-3">
          <Link to="/" className="link transition-all  text-black truncate">
            Men Opaque Casual Shirt
          </Link>
        </p>

        <p className="text-sm mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          unde quam beatae earum. Aspernatur hic rerum animi magni corporis
          minus ut neque impedit voluptate, nisi fugiat ex aliquid aperiam
          inventore ipsam nobis, aut explicabo quidem.
        </p>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />

        <div className="flex items-center gap-3">
          <span className="line-through text-gray-500">$58.00</span>
          <span className="text-[#ff5252] font-bold">$55.00</span>
        </div>
        <div className="mt-3">
          <Button className="!bg-primary !rounded-md !text-white !flex !gap-2 !p-2 !px-4">
            <FaCartShopping className="text-xl" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
