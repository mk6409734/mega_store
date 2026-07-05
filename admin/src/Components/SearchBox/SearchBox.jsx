import React from "react";
import { IoIosSearch } from "react-icons/io";

export const SearchBox = ({
  value,
  onChange,
  placeholder
}) => {
  return (
    <div className="w-full h-auto bg-gray-100 relative overflow-hidden">
      <IoIosSearch className="absolute top-3 left-3 z-50 pointer-events-none text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full h-10 border border-gray-300 bg-gray-100 p-2 pl-8 focus:outline-none focus:border-blue-400 rounded-md text-sm transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
};
