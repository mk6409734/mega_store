import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosGitCompare } from "react-icons/io";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { QtyBox } from "./QtyBox";

export const ProductDetailComponent = () => {
  const [Active, setIsActive] = useState(null);
  return (
    <>
      <h1 className="text-2xl font-semibold mb-2">Men Opaque Casual Shirt</h1>
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">
          Brands:{" "}
          <span className="font-medium text-black opacity-75">CLAFOUTIS</span>
        </span>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <span className="text-sm cursor-pointer">Review (4)</span>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <span className="line-through text-gray-500 text-xl">$58.00</span>
        <span className="text-[#ff5252] font-bold text-xl">$55.00</span>

        <span className="text-sm">
          Available In Stock:{" "}
          <span className="text-green-600 text-sm font-bold">147 Items</span>
        </span>
      </div>

      <p className="text-sm mt-3 pr-10 mb-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
        corporis excepturi porro quisquam architecto expedita autem aspernatur
        quos magni assumenda corrupti reprehenderit culpa perferendis alias,
        minima doloremque non possimus iure?{" "}
      </p>

      <div className="flex items-center gap-3">
        <span className="text-lg">Size:</span>
        <div className="flex items-center gap-1 action">
          <Button
            className={`${Active === 0 ? "!bg-primary !text-white" : ""}`}
            onClick={() => setIsActive(0)}
          >
            S
          </Button>
          <Button
            className={`${Active === 1 ? "!bg-primary !text-white" : ""}`}
            onClick={() => setIsActive(1)}
          >
            M
          </Button>
          <Button
            className={`${Active === 2 ? "!bg-primary !text-white" : ""}`}
            onClick={() => setIsActive(2)}
          >
            L
          </Button>
          <Button
            className={`${Active === 3 ? "!bg-primary !text-white" : ""}`}
            onClick={() => setIsActive(3)}
          >
            XL
          </Button>
        </div>
      </div>

      <p className="text-sm mt-5 mb-2 text-black">
        Free Shipping (Est. Delivery Time 2-3 Days)
      </p>

      <div className="flex items-center py-4 gap-4">
        <div className="qtyBoxWrapper w-18">
          <QtyBox />
        </div>

        <Button className="!bg-primary !rounded-md !text-white !flex !gap-2 !p-2 !px-4">
          <FaCartShopping className="text-xl" />
          Add to Cart
        </Button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="flex items-center gap-2 text-sm link cursor-pointer">
          <IoMdHeartEmpty className="text-xl" />
          Add to Wishlist
        </span>
        <span className="flex items-center gap-2 text-sm link cursor-pointer">
          <IoIosGitCompare className="text-xl" />
          Add to Compare
        </span>
      </div>
    </>
  );
};
