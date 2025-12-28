import React, { useState } from "react";
import Rating from "@mui/material/Rating";

import { UploadBox } from "../UploadBox/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";

export const AddHomeSlider = () => {
  const [data, setdata] = useState({
    ProductName: "",
    ProductDescription: "",
    ProductCategory: "",
    ProductSubCategory: "",
    ProductPrice: "",
    ProductOldPrice: "",
    IsFeatured: "",
    Stock: "",
    Brand: "",
    Discount: "",
    ProductRams: "",
    Weight: "",
    Size: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
    console.log(`${name} changed:`, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <section className="p-8 dark:bg-zinc-700">
      <form onSubmit={handleSubmit} className="">
        <div className="w-full p-5 px-0">
          <h1 className="font-semibold mb-5 dark:text-white">Media & Images</h1>
          <div className="grid grid-cols-7 gap-4">
            <div className="relative">
              <span className="absolute w-6 h-6 rounded-full overflow-hidden bg-red-700 -top-2 -right-2 flex items-center justify-center z-50 cursor-pointer">
                <IoClose className="text-white" />
              </span>
              <div className="relative rounded-md overflow-hidden border border-dashed border-gray-500 h-40 w-full bg-gray-50 cursor-pointer hover:bg-gray-100 flex flex-col items-center justify-center">
                <LazyLoadImage
                  className="w-full h-full object-cover"
                  alt={"image"}
                  effect="blur"
                  src="/avatar.jpg" // use normal <img> attributes as props
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "1s" },
                  }}
                />
              </div>
            </div>

            <UploadBox multiple={true} />
          </div>
        </div>

        <br />

        <Button className="!bg-blue-600 !rounded-md !px-4 !py-2 !text-white !flex !items-center !gap-2">
          <FaCloudUploadAlt className="text-xl" />
          Publish and View
        </Button>
      </form>
    </section>
  );
};
