import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GoTriangleDown } from "react-icons/go";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";

export const MyListItems = (props) => {
  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-gray-300 ">
      <div className="img w-[15%] rounded-md overflow-hidden">
        <Link to="/product/3532" className="group">
          <img
            src="https://serviceapi.spicezgold.com/download/1742462909156_gdgd1.jpg"
            alt="cartproduct"
            className="w-full group-hover:scale-105 transition-all"
          />
        </Link>
      </div>

      <div className="info w-[85%] relative">
        <IoMdClose className="cursur-pointer absolute top-0 right-1 text-xl link transition-all" />
        <h1 className="text-sm">Campus Sutra</h1>
        <Link>
          <p className="link font-semibold">
            Men Comfort Cuban Collar Solid Polycotton Casual Shirt
          </p>
        </Link>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <div className="flex items-center gap-3 mt-1 text-sm mb-4">
          <span className="line-through text-gray-500 font-semibold">
            $58.00
          </span>
          <span className="text-[#ff5252] font-semibold">$55.00</span>
          <span className="text-[#ff5252] font-semibold">55% OFF</span>
        </div>

        <Button className="btn-org !px-5" variant="contained">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
