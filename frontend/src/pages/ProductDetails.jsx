import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { ProductZoom } from "../components/ProductZoom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ProductsSlider } from "../components/ProductsSlider";
import { ProductDetailComponent } from "../components/ProductDetailComponent";

export const ProductDetails = () => {
   
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="pt-5">
        <div className="container mx-auto pb-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href=""
              className="link transition text-sm"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href=""
              className="link transition text-sm"
            >
              Fashion
            </Link>
            <Link
              underline="hover"
              color="inherit"
              className="link transition text-sm"
            >
              Product
            </Link>
          </Breadcrumbs>
        </div>

        <section className="bg-white py-5">
          <div className="container mx-auto md:flex items-center justify-between gap-8">
            <div className="productZoomContainer w-[40%]">
              <ProductZoom />
            </div>

            <div className="productContent w-[60%] pr-10 pl-10">
              <ProductDetailComponent />
            </div>
          </div>

          <div className="container mx-auto pt-10">
            <div className="flex items-center gap-4">
              <span
                className={`link text-lg cursor-pointer font-medium ${
                  activeTab === 0 ? "text-primary" : ""
                }`}
                onClick={() => setActiveTab(0)}
              >
                Description
              </span>
              <span
                className={`link text-lg cursor-pointer font-medium ${
                  activeTab === 1 ? "text-primary" : ""
                }`}
                onClick={() => setActiveTab(1)}
              >
                Product Details
              </span>
              <span
                className={`link text-lg cursor-pointer font-medium ${
                  activeTab === 2 ? "text-primary" : ""
                }`}
                onClick={() => setActiveTab(2)}
              >
                Reviews (5)
              </span>
            </div>

            {activeTab === 0 && (
              <div className="sha w-full p-5 rounded-md mt-7 py-5 px-8 space-y-4">
                <p>
                  The best is yet to come! Give your walls a voice with a framed
                  poster. This aesthethic, optimistic poster will look great in
                  your desk or in an 0Fkn-space office. Painted wooden frame
                  with passe-partout for more depth.
                </p>
                <h1 className="font-semibold">Lightweight Design</h1>
                <p>
                  Designed with a super light geometric case, the Versa family
                  watches are slim, casual and comfortable enough to wear all
                  day and night. Switch up your look with classic, leather,
                  metal and woven accessory bands. Ut elit tellus, luctus nec
                  ullamcorper mattis, pulvinar dapibus leo.
                </p>
                <h1 className="font-semibold">Free Shipping & Return</h1>
                <p>
                  We offer free shipping for products on orders above 50$ and
                  offer free delivery for all orders in US.
                </p>
                <h1 className="font-semibold">Money Back Guarantee</h1>
                <p>
                  we guarantee our products and you could get back all of your
                  money anytime you want in Be days.
                </p>
                <h1 className="font-semibold">Online Support</h1>
                <p>
                  You will get 24 hour support with this purchase product and
                  you can return it within 30 days for an exchange.
                </p>
              </div>
            )}

            {activeTab === 1 && (
              <div className="sha w-full p-5 rounded-md mt-7 py-5 px-8">
                <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Color
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-white border-b  border-gray-200">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          Apple MacBook Pro 17"
                        </th>
                        <td class="px-6 py-4">Silver</td>
                        <td class="px-6 py-4">Laptop</td>
                        <td class="px-6 py-4">$2999</td>
                      </tr>
                      <tr class="bg-white border-b  border-gray-200">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          Microsoft Surface Pro
                        </th>
                        <td class="px-6 py-4">White</td>
                        <td class="px-6 py-4">Laptop PC</td>
                        <td class="px-6 py-4">$1999</td>
                      </tr>
                      <tr class="bg-white">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          Magic Mouse 2
                        </th>
                        <td class="px-6 py-4">Black</td>
                        <td class="px-6 py-4">Accessories</td>
                        <td class="px-6 py-4">$99</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="sha w-[80%] p-5 rounded-md mt-7 py-5 px-8">
                {" "}
                {/* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */}
                <div className="w-full productReviewsContainer">
                  <h2 className="text-lg">Customer question & answers</h2>

                  <div className="reviewScroll w-full max-h-80 overflow-y-scroll overflow-x-hidden mt-5 pr-5">
                    <div className="review w-full flex items-center justify-between py-5 border-b border-gray-300">
                      <div className="info w-[60%] flex items-center gap-3">
                        <div className="img w-20 h-20 overflow-hidden rounded-full">
                          <img
                            src="https://th.bing.com/th/id/OIP.FJ5SLw1rTv31pJw35MiEwgAAAA?cb=iwc2&rs=1&pid=ImgDetMain"
                            alt="user"
                            className="w-full"
                          />
                        </div>

                        <div className="w-[80%]">
                          <h1 className="text-base">Mohit Kumar</h1>
                          <h2 className="text-sm mb-0">2025-12-01</h2>
                          <h2 className="text-xs mt-0 mb-0">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Praesentium enim sed tempora.
                          </h2>
                        </div>
                      </div>
                      <Rating name="size-small" defaultValue={4} readOnly />
                    </div>
                    <div className="review w-full flex items-center justify-between py-5 border-b border-gray-300">
                      <div className="info w-[60%] flex items-center gap-3">
                        <div className="img w-20 h-20 overflow-hidden rounded-full">
                          <img
                            src="https://th.bing.com/th/id/OIP.FJ5SLw1rTv31pJw35MiEwgAAAA?cb=iwc2&rs=1&pid=ImgDetMain"
                            alt="user"
                            className="w-full"
                          />
                        </div>

                        <div className="w-[80%]">
                          <h1 className="text-base">Mohit Kumar</h1>
                          <h2 className="text-sm mb-0">2025-12-01</h2>
                          <h2 className="text-xs mt-0 mb-0">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Praesentium enim sed tempora.
                          </h2>
                        </div>
                      </div>
                      <Rating name="size-small" defaultValue={4} readOnly />
                    </div>
                    <div className="review w-full flex items-center justify-between py-5 border-b border-gray-300">
                      <div className="info w-[60%] flex items-center gap-3">
                        <div className="img w-20 h-20 overflow-hidden rounded-full">
                          <img
                            src="https://th.bing.com/th/id/OIP.FJ5SLw1rTv31pJw35MiEwgAAAA?cb=iwc2&rs=1&pid=ImgDetMain"
                            alt="user"
                            className="w-full"
                          />
                        </div>

                        <div className="w-[80%]">
                          <h1 className="text-base">Mohit Kumar</h1>
                          <h2 className="text-sm mb-0">2025-12-01</h2>
                          <h2 className="text-xs mt-0 mb-0">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Praesentium enim sed tempora.
                          </h2>
                        </div>
                      </div>
                      <Rating name="size-small" defaultValue={4} readOnly />
                    </div>
                  </div>

                  <div className="reviewForm bg-[#fafafa] p-4 rounded-md mt-3">
                    <h1 className="text-lg">Add a Review</h1>

                    <form className="w-full mt-5">
                      <TextField
                        id="outlined-multiline-static"
                        label="Write a review..."
                        multiline
                        rows={4}
                        className="w-full"
                      />
                      <br />
                      <br />
                      <Rating name="size-small" defaultValue={4} />

                      <div className="flex items-center mt-5">
                        <Button className="!bg-primary !text-white !rounded-md !p-2 !px-3">
                          Submit Review
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="container mx-auto pt-8">
            <h2 className="text-xl font-semibold pb-0">Related Products</h2>
            <ProductsSlider items={5} />
          </div>
        </section>
      </div>
    </>
  );
};
