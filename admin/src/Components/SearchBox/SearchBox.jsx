import React from "react";
import { IoIosSearch } from "react-icons/io";

export const SearchBox = () => {
  return (
    <div className="w-full h-auto bg-gray-100 relative overflow-hidden">
      <IoIosSearch className="absolute top-3 left-3 z-50 pointer-events-none" />
      <input
        type="text"
        className="w-full h-10 border border-gray-500 bg-gray-100 p-2 pl-8 focus:outline-none focus:border-gray-600 rounded-md "
        placeholder="Search here..."
      />
    </div>
  );
};
