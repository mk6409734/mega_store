import React from "react";
import Button from "@mui/material/Button";
import { IoSearch } from "react-icons/io5";
export const Search = () => {
  return (
    <div className="searchbox min-w-xl rounded-md bg-gray-200 h-12 p-2 flex items-center relative">
      <input type="text" placeholder="Search for Products..." className="w-full h-8 focus:outline-none bg-inherit p-2" />
      <Button className="!rounded-full !w-[37px] h-[37px] !min-w-[37px] !text-black">
        <IoSearch className="w-5 h-5 text-gray-700"/>
      </Button>
    </div>
  ); 
};
