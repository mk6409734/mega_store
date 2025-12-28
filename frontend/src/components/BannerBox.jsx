import React from "react";
import { Link } from "react-router-dom";

export const BannerBox = (props) => {
  return (
    <div className="overflow-hidden rounded-lg group">
      <Link to={"/"}>
        <img
          src={props.img}
          className="w-full group-hover:scale-110 transition-all group-hover:rotate-1"
          alt="Banner"
        />
      </Link>
    </div>
  );
};
