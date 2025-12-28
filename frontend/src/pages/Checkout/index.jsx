import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./index.css";
import { Button } from "@mui/material";
import { IoBagCheckOutline } from "react-icons/io5";

export const Checkout = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollableHeight = scrollHeight - clientHeight;

    if (scrollableHeight > 0) {
      const progress = Math.min(scrollTop / scrollableHeight, 1);
      setScrollProgress(progress);
    } else {
      setScrollProgress(0);
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto lg:flex flex-row gap-5">
        <div className="leftCol lg:w-[70%]">
          <div className="bg-white shadow-md p-5 rounded-md w-full">
            <h1 className="font-bold">Billing Details *</h1>
            <form className="w-full mt-5">
              <div className="flex items-center gap-5 pb-5">
                <div className="w-[50%]">
                  <TextField
                    className="w-full"
                    label="Full Name"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    className="w-full"
                    type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <h1 className="mb-3 font-bold">Street Address *</h1>
              <div className="flex items-center gap-5 pb-5">
                <div className="w-full">
                  <TextField
                    className="w-full"
                    label="House No. and Street Name"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-5">
                <div className="w-full">
                  <TextField
                    className="w-full"
                    label="Apartment Suite unit. etc (optional)"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-5">
                <div className="w-[50%]">
                  <TextField
                    className="w-full"
                    label="Town / City *"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    className="w-full"
                    type="email"
                    label="State / Country *"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <h1 className="mb-3 font-bold">PostCode / ZIP *</h1>
              <div className="flex items-center gap-5 pb-5">
                <div className="w-full">
                  <TextField
                    className="w-full"
                    label="Zip Code"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-5">
                <div className="w-[50%]">
                  <TextField
                    className="w-full"
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    className="w-full"
                    type="email"
                    label="Email Address"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="rightCol lg:w-[30%] mt-5 lg:m-0">
          <div className="shadow-md bg-white p-5 rounded-md">
            <h1 className="font-semibold mb-3">Your Order</h1>
            <div className="flex items-center justify-between py-3 border-t border-b border-gray-300">
              <span className="font-semibold">Product</span>
              <span className="font-semibold">Subtotal</span>
            </div>
            <div className="relative">
              <div
                onScroll={handleScroll}
                className="scroll max-h-60 overflow-y-scroll overflow-x-hidden pr-2 relative"
              >
                {/* Content with proper z-index */}
                <div className="relative z-0">
                  <div className="flex items-center justify-between py-2">
                    <div className="part1 flex items-center gap-3">
                      <div className="h-14 w-14 object-cover overflow-hidden rounded-md group cursor-pointer">
                        <img
                          className="w-full transition-all group-hover:scale-105"
                          src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
                          alt="product image"
                        />
                      </div>
                      <div className="info w-44">
                        <h1 className="text-sm truncate">
                          Men Comfort Cuban Collar Solid Polycotton Casual Shirt
                        </h1>
                        <span className="text-sm">Qty: 1</span>
                      </div>
                    </div>
                    <div className="part2">
                      <span>$1,300.00</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="part1 flex items-center gap-3">
                      <div className="h-14 w-14 object-cover overflow-hidden rounded-md group cursor-pointer">
                        <img
                          className="w-full transition-all group-hover:scale-105"
                          src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
                          alt="product image"
                        />
                      </div>
                      <div className="info w-44">
                        <h1 className="text-sm truncate">
                          Men Comfort Cuban Collar Solid Polycotton Casual Shirt
                        </h1>
                        <span className="text-sm">Qty: 1</span>
                      </div>
                    </div>
                    <div className="part2">
                      <span>$1,300.00</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="part1 flex items-center gap-3">
                      <div className="h-14 w-14 object-cover overflow-hidden rounded-md group cursor-pointer">
                        <img
                          className="w-full transition-all group-hover:scale-105"
                          src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
                          alt="product image"
                        />
                      </div>
                      <div className="info w-44">
                        <h1 className="text-sm truncate">
                          Men Comfort Cuban Collar Solid Polycotton Casual Shirt
                        </h1>
                        <span className="text-sm">Qty: 1</span>
                      </div>
                    </div>
                    <div className="part2">
                      <span>$1,300.00</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="part1 flex items-center gap-3">
                      <div className="h-14 w-14 object-cover overflow-hidden rounded-md group cursor-pointer">
                        <img
                          className="w-full transition-all group-hover:scale-105"
                          src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
                          alt="product image"
                        />
                      </div>
                      <div className="info w-44">
                        <h1 className="text-sm truncate">
                          Men Comfort Cuban Collar Solid Polycotton Casual Shirt
                        </h1>
                        <span className="text-sm">Qty: 1</span>
                      </div>
                    </div>
                    <div className="part2">
                      <span>$1,300.00</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="part1 flex items-center gap-3">
                      <div className="h-14 w-14 object-cover overflow-hidden rounded-md group cursor-pointer">
                        <img
                          className="w-full transition-all group-hover:scale-105"
                          src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
                          alt="product image"
                        />
                      </div>
                      <div className="info w-44">
                        <h1 className="text-sm truncate">
                          Men Comfort Cuban Collar Solid Polycotton Casual Shirt
                        </h1>
                        <span className="text-sm">Qty: 1</span>
                      </div>
                    </div>
                    <div className="part2">
                      <span>$1,300.00</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="part1 flex items-center gap-3">
                      <div className="h-14 w-14 object-cover overflow-hidden rounded-md group cursor-pointer">
                        <img
                          className="w-full transition-all group-hover:scale-105"
                          src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
                          alt="product image"
                        />
                      </div>
                      <div className="info w-44">
                        <h1 className="text-sm truncate">
                          Men Comfort Cuban Collar Solid Polycotton Casual Shirt
                        </h1>
                        <span className="text-sm">Qty: 1</span>
                      </div>
                    </div>
                    <div className="part2">
                      <span>$1,300.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top fade overlay - positioned outside scrollable area */}
              <div
                className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white to-transparent pointer-events-none z-20 fade-overlay"
                style={{ opacity: scrollProgress > 0 ? 1 : 0 }}
              ></div>

              {/* Bottom fade overlay - positioned outside scrollable area */}
              <div
                className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-20 fade-overlay"
                style={{ opacity: scrollProgress < 1 ? 1 : 0 }}
              ></div>
            </div>
            <div className="flex items-center justify-center w-full mt-7">
              <Button className="btn-org !py-3 w-full ">
                <IoBagCheckOutline className="w-5 h-5 mr-2 items-center" />
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
