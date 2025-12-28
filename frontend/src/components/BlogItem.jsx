import React from "react";
import { IoMdTime } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
export const BlogItem = (props) => {
  return (
    <div className="group">
      <div className="w-full overflow-hidden  cursor-pointer relative">
        <img
          src={props.img}
          alt="blog image"
          className="w-full rounded-md transition-all group-hover:scale-105 group-hover:rotate-1"
        />
        <span className="flex items-center justify-center text-white text-xs absolute bottom-3.5 right-3.5 z-50 bg-[#ff5252] rounded-md p-1 gap-1">
          <IoMdTime className="text-sm" /> 5 April, 2025
        </span>
      </div>
      <div className="py-4 space-y-1.5">
        <h2 className="text-black font-semibold text-sm">
          <Link to="/" className="link">
            {props.title}
          </Link>
        </h2>
        <p className="text-sm text-gray-700 mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          hic...
        </p>
        <Link className="link flex items-center gap-1">
          Read More <IoIosArrowForward />
        </Link>
      </div>
    </div>
  );
};
