import React, { useState } from "react";
import { UploadBox } from "../UploadBox/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";

export const AddSubCategory = () => {
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
        <div className="w-1/2 p-5 px-0">
          <div>
            <h1 className="mb-3 dark:text-white">Product Category</h1>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="ProductCategory"
              value={data.ProductCategory}
              onChange={handleInput}
            >
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="wellness">Wellness</option>
            </select>
          </div>
          <br />
          <div>
            <h1 className="mb-1 dark:text-white">Sub Category Name</h1>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="ProductName"
              value={data.ProductName}
              onChange={handleInput}
            />
          </div>
          <br />
          
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
