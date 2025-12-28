import React, { useState } from "react";
import { Collapse } from "react-collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Button } from "@mui/material";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";

export const Sidebar = () => {
  const [open, setIsOpen] = useState(true);
  const [open1, setIsOpen1] = useState(true);
  const [open2, setIsOpen2] = useState(true);
  return (
    <aside className="sidebar py-5">
      <div className="box">
        <h1 className="w-full pr-5 mb-3 text-xl font-semibold flex items-center ">
          Shop by Category{" "}
          <Button
            className="!w-7 !h-7 !min-w-7 !rounded-full !ml-auto !text-black"
            onClick={() => setIsOpen(!open)}
          >
            {open === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h1>
        <Collapse isOpened={open}>
          <div className="scroll px-4 relative -left-2.5">
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Fashion"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Electronics"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Bags"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Footwear"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Groceries"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Beauty"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Wellness"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Jewellery"
            />
          </div>
        </Collapse>
      </div>

      <div className="box">
        <h1 className="w-full pr-5 mb-3 text-xl font-semibold flex items-center ">
          Availability{" "}
          <Button
            className="!w-7 !h-7 !min-w-7 !rounded-full !ml-auto !text-black"
            onClick={() => setIsOpen1(!open1)}
          >
            {open1 === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h1>
        <Collapse isOpened={open1}>
          <div className="scroll px-4 relative -left-2.5">
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Available (17)"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="In Stock (10)"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Not available (17)"
            />
          </div>
        </Collapse>
      </div>
      <div className="box mt-3">
        <h1 className="w-full pr-5 mb-3 text-xl font-semibold flex items-center ">
          Size{" "}
          <Button
            className="!w-7 !h-7 !min-w-7 !rounded-full !ml-auto !text-black"
            onClick={() => setIsOpen2(!open2)}
          >
            {open2 === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h1>
        <Collapse isOpened={open2}>
          <div className="scroll px-4 relative -left-2.5">
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Small (17)"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Medium(10)"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Large (17)"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="Xl (5)"
            />
            <FormControlLabel
              className="w-full"
              control={<Checkbox size="small" />}
              label="XXL (3)"
            />
          </div>
        </Collapse>
      </div>
      <div className="box mt-4">
        <h1 className="w-full pr-5 mb-3 text-xl font-semibold flex items-center ">
          Filter by Price
        </h1>
        <RangeSlider />
        <div className="flex pt-4 pb-2">
          <span className="text-sm">
            From: <strong className="font-bold">Rs: {100}</strong>
          </span>
          <span className="ml-auto text-sm">
            To: <strong className="font-bold">Rs: {5000}</strong>
          </span>
        </div>
      </div>
      <div className="box mt-4">
        <h1 className="w-full pr-5 mb-3 text-xl font-semibold flex items-center ">
          Filter by Rating
        </h1>
        <div className="w-full">
          <Rating name="size-small" defaultValue={5} size="small" />
        </div>
        <div className="w-full">
          <Rating name="size-small" defaultValue={4} size="small" />
        </div>
        <div className="w-full">
          <Rating name="size-small" defaultValue={3} size="small" />
        </div>
        <div className="w-full">
          <Rating name="size-small" defaultValue={2} size="small" />
        </div>
        <div className="w-full">
          <Rating name="size-small" defaultValue={1} size="small" />
        </div>
      </div>
    </aside>
  );
};
