import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GoTriangleDown } from "react-icons/go";
import Rating from "@mui/material/Rating";

export const CartItems = (props) => {
  const [sizeanchorEl, setSizeAnchorEl] = useState(null);
  const [selectedSize, setSelectedSize] = useState(props.size)
  const openSize = Boolean(sizeanchorEl);
  const handleClickSize = (event) => {
    setSizeAnchorEl(event.currentTarget);
  };
  const handleCloseSize = (value) => {
    setSizeAnchorEl(null);
    if(value !== null){
        setSelectedSize(value)
    }
  };
  const [qtyanchorEl, setQtyAnchorEl] = useState(null);
  const [selectedqty, setSelectedQty] = useState(props.qty)
  const openQty = Boolean(qtyanchorEl);
  const handleClickqty = (event) => {
    setQtyAnchorEl(event.currentTarget);
  };
  const handleCloseQty = (value) => {
    setQtyAnchorEl(null);
    if(value !== null){
        setSelectedQty(value);
    }
  };
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
        <div className="flex items-center gap-4 my-1">
          <div className="relative">
            <span
              onClick={handleClickSize}
              className="flex items-center justify-center bg-[#f1f1f1] text-sm  py-1 px-2 rounded-md cursor-pointer"
            >
              Size: {selectedSize} <GoTriangleDown />
            </span>

            <Menu
              id="basic-menu"
              anchorEl={sizeanchorEl}
              open={openSize}
              onClose={() => handleCloseSize(null)}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <MenuItem onClick={() => handleCloseSize("S")}>S</MenuItem>
              <MenuItem onClick={() => handleCloseSize("M")}>M</MenuItem>
              <MenuItem onClick={() => handleCloseSize("L")}>L</MenuItem>
              <MenuItem onClick={() => handleCloseSize("XL")}>XL</MenuItem>
              <MenuItem onClick={() => handleCloseSize("XXL")}>XXL</MenuItem>
            </Menu>
          </div>
          <div className="relative">
            <span
              onClick={handleClickqty}
              className="flex items-center justify-center bg-[#f1f1f1] text-sm  py-1 px-2 rounded-md cursor-pointer"
            >
              Qty: {selectedqty} <GoTriangleDown />
            </span>

            <Menu
              id="basic-menu"
              anchorEl={qtyanchorEl}
              open={openQty}
              onClose={() => handleCloseQty(null)}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <MenuItem onClick={() => handleCloseQty(1)}>1</MenuItem>
              <MenuItem onClick={() => handleCloseQty(2)}>2</MenuItem>
              <MenuItem onClick={() => handleCloseQty(3)}>3</MenuItem>
              <MenuItem onClick={() => handleCloseQty(4)}>4</MenuItem>
              <MenuItem onClick={() => handleCloseQty(5)}>5</MenuItem>
              <MenuItem onClick={() => handleCloseQty(6)}>6</MenuItem>
              <MenuItem onClick={() => handleCloseQty(7)}>7</MenuItem>
              <MenuItem onClick={() => handleCloseQty(8)}>8</MenuItem>
              <MenuItem onClick={() => handleCloseQty(9)}>9</MenuItem>
              <MenuItem onClick={() => handleCloseQty(10)}>10</MenuItem>
              
            </Menu>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-1 text-sm">
          <span className="line-through text-gray-500 font-semibold">
            $58.00
          </span>
          <span className="text-[#ff5252] font-semibold">$55.00</span>
          <span className="text-[#ff5252] font-semibold">55% OFF</span>
        </div>
      </div>
    </div>
  );
};
