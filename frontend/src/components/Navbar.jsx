import { Button } from "@mui/material";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import { CategoryPanel } from "./CategoryPanel";

export const Navbar = () => {
  return (
    <nav className="container mx-auto bg-white">
      <div className="flex items-center gap-3">
        <div className="w-[20%]">
          <CategoryPanel />
        </div>
        <div className="w-[60%]">
          <ul className="flex items-center gap-2">
            <li>
              <Link to="/" className="link transition font-medium">
                <Button className="link transition !font-medium !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                  Home
                </Button>
              </Link>
            </li>
            <li className="relative">
              <Link to="/productlisting" className="link transition font-medium">
                <Button className="link transition !font-medium !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                  Fashion
                </Button>
              </Link>

              <div className="submenu absolute top-5 left-0 min-w-48 bg-white shadow-md opacity-0 transition-all">
                <ul>
                  <li>
                    <Link to="/">
                      <Button className="!text-gray-600 w-full !justify-between !rounded-none hover:!text-[#ff5252]">
                        Men
                        <IoIosArrowForward />
                      </Button>
                      <div className="menu absolute top-5 left-0 min-w-48 bg-white shadow-md opacity-0 transition-all">
                        <ul>
                          <li>
                            <Link to="/">
                              <Button className="!text-gray-600 w-full !justify-start !rounded-none hover:!text-[#ff5252]">
                                T-Shirt
                              </Button>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <Button className="!text-gray-600 w-full !justify-start !rounded-none hover:!text-[#ff5252]">
                                Jeans
                              </Button>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <Button className="!text-gray-600 w-full !justify-start !rounded-none hover:!text-[#ff5252]">
                                Footwear
                              </Button>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <Button className="!text-gray-600 w-full !justify-start !rounded-none hover:!text-[#ff5252]">
                                Watch
                              </Button>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <Button className="!text-gray-600 w-full !justify-start !rounded-none hover:!text-[#ff5252]">
                                Accessories
                              </Button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button className="!text-gray-600 w-full !justify-start !rounded-none hover:!text-[#ff5252]">
                        women
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button className="!text-gray-600 w-full !justify-start !rounded-none hover:!text-[#ff5252]">
                        Kids
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button className="!text-gray-600 w-full !justify-start !rounded-none hover:!text-[#ff5252]">
                        Girls
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button className="!text-gray-600 w-full !justify-start !rounded-none hover:!text-[#ff5252]">
                        Papa
                      </Button>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link to="/productdetails" className="link transition font-medium">
                <Button className="link transition !font-medium !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                  Electronics
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/" className="link transition font-medium">
                <Button className="link transition !font-medium !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                  Bags
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/" className="link transition font-medium">
                <Button className="link transition !font-medium !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                  Footwear
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/" className="link transition font-medium">
                <Button className="link transition !font-medium !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                  Groceries
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/" className="link transition font-medium">
                <Button className="link transition !font-medium !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                  Beauty
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/" className="link transition font-medium">
                <Button className="link transition !font-medium !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                  Wellness
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/" className="link transition font-medium">
                <Button className="link transition !font-medium !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                  Jewellery
                </Button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-[20%]">
          <p className="font-medium text-sm flex items-center gap-3 mb-0 mt-0">
            <GoRocket className="text-lg" />
            Free International Delivery
          </p>
        </div>
      </div>
    </nav>
  );
};
