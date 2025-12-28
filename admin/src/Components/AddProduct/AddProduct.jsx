import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import "./AddProduct.css";
import { UploadBox } from "../UploadBox/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";

export const AddProduct = () => {
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
        <div className="grid grid-cols-1 mb-3">
          <div>
            <h1 className="mb-1 dark:text-white">Product Name</h1>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="ProductName"
              value={data.ProductName}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mb-3">
          <div>
            <h1 className="mb-3 dark:text-white">Product Description</h1>
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="ProductDescription"
              value={data.ProductDescription}
              onChange={handleInput}
              rows={4}
              placeholder="Enter product description..."
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
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
          <div>
            <h1 className="mb-3 dark:text-white">Product Sub Category</h1>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="ProductSubCategory"
              value={data.ProductSubCategory}
              onChange={handleInput}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div>
            <h1 className="mb-3 dark:text-white">Product Price</h1>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              name="ProductPrice"
              value={data.ProductPrice}
              onChange={handleInput}
              placeholder="Enter price..."
            />
          </div>
          <div>
            <h1 className="mb-3 dark:text-white">Product Old Price</h1>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              name="ProductOldPrice"
              value={data.ProductOldPrice}
              onChange={handleInput}
              placeholder="Enter old price..."
            />
          </div>
          <div>
            <h1 className="mb-3 dark:text-white">Is Featured?</h1>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="IsFeatured"
              value={data.IsFeatured}
              onChange={handleInput}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div>
            <h1 className="mb-3 dark:text-white"> Stock</h1>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              name="Stock"
              value={data.Stock}
              onChange={handleInput}
              placeholder="Enter price..."
            />
          </div>
          <div>
            <h1 className="mb-3">Brand</h1>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="Brand"
              value={data.Brand}
              onChange={handleInput}
              placeholder="Enter Brand..."
            />
          </div>
          <div>
            <h1 className="mb-3 dark:text-white">Discount</h1>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              name="Discount"
              value={data.Discount}
              onChange={handleInput}
              placeholder="Enter Discount..."
            />
          </div>
          <div>
            <h1 className="mb-3 dark:text-white">Product Weight</h1>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="Weight"
              value={data.Weight}
              onChange={handleInput}
            >
              <option value="2kg">2KG</option>
              <option value="4kg">4KG</option>
              <option value="5kg">5KG</option>
            </select>
          </div>
          <div>
            <h1 className="mb-3 dark:text-white">Product Size</h1>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="Size"
              value={data.Size}
              onChange={handleInput}
            >
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
            </select>
          </div>
          <div>
            <h1 className="mb-3 dark:text-white">Product RAM</h1>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="ProductRams"
              value={data.ProductRams}
              onChange={handleInput}
            >
              <option value="4gb">4GB</option>
              <option value="6gb">6GB</option>
              <option value="8gb">8GB</option>
            </select>
          </div>
          <div>
            <h1 className="mb-3 dark:text-white">Rating</h1>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          </div>
        </div>

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
                  src="./avatar.jpg" // use normal <img> attributes as props
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "1s" },
                  }}
                />
              </div>
            </div>
            <div className="relative">
              <span className="absolute w-6 h-6 rounded-full overflow-hidden bg-red-700 -top-2 -right-2 flex items-center justify-center z-50 cursor-pointer">
                <IoClose className="text-white " />
              </span>
              <div className="relative rounded-md overflow-hidden border border-dashed border-gray-500 h-40 w-full bg-gray-50 cursor-pointer hover:bg-gray-100 flex flex-col items-center justify-center">
                <LazyLoadImage
                  className="w-full h-full object-cover"
                  alt={"image"}
                  effect="blur"
                  src="./avatar.jpg" // use normal <img> attributes as props
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "1s" },
                  }}
                />
              </div>
            </div>
            <div className="relative">
              <span className="absolute w-6 h-6 rounded-full overflow-hidden bg-red-700 -top-2 -right-2 flex items-center justify-center z-50 cursor-pointer">
                <IoClose className="text-white" />
              </span>
              <div className="relative rounded-md overflow-hidden border border-dashed border-gray-500 h-40 w-full bg-gray-50 cursor-pointer hover:bg-gray-100 flex flex-col items-center justify-center">
                <LazyLoadImage
                  className="w-full h-full object-cover"
                  alt={"image"}
                  effect="blur"
                  src="./avatar.jpg" // use normal <img> attributes as props
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "1s" },
                  }}
                />
              </div>
            </div>
            <div className="relative">
              <span className="absolute w-6 h-6 rounded-full overflow-hidden bg-red-700 -top-2 -right-2 flex items-center justify-center z-50 cursor-pointer">
                <IoClose className="text-white" />
              </span>
              <div className="relative rounded-md overflow-hidden border border-dashed border-gray-500 h-40 w-full bg-gray-50 cursor-pointer hover:bg-gray-100 flex flex-col items-center justify-center">
                <LazyLoadImage
                  className="w-full h-full object-cover"
                  alt={"image"}
                  effect="blur"
                  src="./avatar.jpg" // use normal <img> attributes as props
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

        <Button className="!bg-blue-600 !rounded-md !px-4 !py-2 !text-white !flex !items-center !gap-2"><FaCloudUploadAlt className="text-xl"/>
          Publish and View
        </Button>
      </form>
    </section>
  );
};
