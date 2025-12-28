import React from "react";
import {Link} from "react-router-dom";
export const BannerBoxV2 = (props) => {
  return (
    <div className="w-full overflow-hidden rounded-md group relative">
      <img
        className="bannerBoxV2 w-full transition-all duration-150 group-hover:scale-105"
        src={props.image}
        alt=""
      />
      <div
        className={`info absolute p-5 top-0 ${
          props.info === "right" ? "left-0" : "right-0"
        } w-[50%] h-full z-50 flex flex-col items-center justify-between gap-2`}
      >
        <h1 className="text-xl font-semibold">{props.title}</h1>
        <span className="text-primary w-full text-2xl font-bold">{props.price}</span>
        <div className="w-full">

        <Link to="/" className="link text-xl underline">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}