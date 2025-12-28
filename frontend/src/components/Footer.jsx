import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FcShipped } from "react-icons/fc";
import { FcOnlineSupport } from "react-icons/fc";
import { PiChats } from "react-icons/pi";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import Drawer from "@mui/material/Drawer";
import { IoMdClose } from "react-icons/io";
import { CartPannel } from "./CartPannel";
import { MyContext } from "../App";

export const Footer = () => {
  const context = useContext(MyContext)
  return (
    <>
      <footer className="py-6 bg-[#fafafa]">
        <div className="container mx-auto">
          <div className="flex items-center justify-around gap-2 py-8 pb-8">
            <div className="flex items-center justify-center flex-col group">
              <FcShipped className="text-6xl transition-all duration-300 group-hover:-translate-y-1" />
              <h1 className="font-semibold mt-3">Free Shipping</h1>
              <p className="text-sm">For all Orders Over $100</p>
            </div>
            <div className="flex items-center justify-center flex-col group">
              <img
                src="./return-box.svg"
                className="transition-all duration-300 group-hover:-translate-y-1"
              />
              <h1 className="font-semibold mt-3">30 Days Returns</h1>
              <p className="text-sm">For an Exchange Product</p>
            </div>
            <div className="flex items-center justify-center flex-col group">
              <img
                src="./wallet.svg"
                className="transition-all duration-300 group-hover:-translate-y-1"
              />
              <h1 className="font-semibold mt-3">Secured Payment</h1>
              <p className="text-sm">Payment Cards Accepted</p>
            </div>
            <div className="flex items-center justify-center flex-col group">
              <img
                src="./gifts.svg"
                className="transition-all duration-300 group-hover:-translate-y-1"
              />
              <h1 className="font-semibold mt-3">Special Gifts</h1>
              <p className="text-sm">Our First Product Order</p>
            </div>
            <div className="flex items-center justify-center flex-col group">
              <FcOnlineSupport className="text-6xl transition-all duration-300 group-hover:-translate-y-1" />
              <h1 className="font-semibold mt-3">Support 24/7</h1>
              <p className="text-sm">Contact Us Anytime</p>
            </div>
          </div>
          <br />
          <hr className="text-gray-300" />

          <div className="flex py-8">
            <div className="w-[25%] border-r border-[rgba(0,0,0,0.1)]">
              <h2 className="text-xl font-semibold mb-4">Contant Us</h2>
              <p className="pb-4 text-sm">
                ClassyShop - Mega Super Store <br /> 507-Union Trade Centre
                France
              </p>
              <Link className="link" to="mailto:sales@yourcompany.">
                sales@yourcompany.
              </Link>
              <span className="text-xl font-semibold block w-full mt-3 mb-5 text-primary">
                (+91) 9876-543-210
              </span>
              <div className="flex items-center gap-2">
                <PiChats className="text-primary text-3xl" />
                <span>
                  Online Chat <br /> Get Expert Help
                </span>
              </div>
            </div>
            <div className="flex w-[40%] pl-8">
              <div className="w-[50%]">
                <h2 className="text-xl font-semibold mb-4">Products</h2>
                <ul className="space-y-2">
                  <li className="text-sm w-full link">
                    <Link to="/">Prices drop</Link>
                  </li>
                  <li className="text-sm w-full link">
                    <Link to="/">New Products</Link>
                  </li>
                  <li className="text-sm w-full link">
                    <Link to="/">Best Sales</Link>
                  </li>
                  <li className="text-sm w-full link">
                    <Link to="/">Contact Us</Link>
                  </li>
                  <li className="text-sm w-full link">
                    <Link to="/">Site Map</Link>
                  </li>
                  <li className="text-sm w-full link">
                    <Link to="/">Stores</Link>
                  </li>
                </ul>
              </div>
              <div className="w-[50%]">
                <h2 className="text-xl font-semibold mb-4">Our company</h2>
                <ul className="space-y-2">
                  <li className="text-sm w-full link">
                    <Link to="/">Delivery</Link>
                  </li>
                  <li className="text-sm w-full link">
                    <Link to="/">Legal Notice</Link>
                  </li>
                  <li className="text-sm w-full link">
                    <Link to="/">Terms And Conditions of Use</Link>
                  </li>
                  <li className="text-sm w-full link">
                    <Link to="/">About Us</Link>
                  </li>
                  <li className="text-sm w-full link">
                    <Link to="/">Secure Payment</Link>
                  </li>
                  <li className="text-sm w-full link">
                    <Link to="/">Login</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-[35%] flex flex-col pr-8">
              <h2 className="text-xl font-semibold mb-4">
                Subscribe to Newsletter
              </h2>
              <p className="text-sm">
                Subscribe to our latest newsletter to get news about Special
                discounts.
              </p>

              <form action="" className="mt-5">
                <input
                  type="text"
                  className="w-full h-11 border border-gray-300 outline-none px-4 rounded-md focus:border-gray-500 mb-4"
                  placeholder="Your Email Address"
                />
                <Button className="!bg-primary !text-white !rounded-sm !capitalize !px-3 !p-2">
                  Subscribe
                </Button>
                <FormControlLabel
                  control={<Checkbox />}
                  label="I agree to the terms and conditions and the privacy policy"
                />
              </form>
            </div>
          </div>
        </div>
      </footer>

      <div className="border-t border-gray-300 py-3 bg-white">
        <div className="container mx-auto flex items-center justify-between">
          <ul className="flex items-center gap-2">
            <li>
              <Link
                to="/"
                className="w-9 h-9 rounded-full  flex items-center justify-center group hover:bg-primary transition-all
              duration-200"
              >
                <FaFacebook className="text-xl group-hover:text-white" />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="w-9 h-9 rounded-full  flex items-center justify-center group hover:bg-primary transition-all
              duration-200"
              >
                <FaYoutube className="text-xl group-hover:text-white" />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="w-9 h-9 rounded-full  flex items-center justify-center group hover:bg-primary transition-all
              duration-200"
              >
                <FaXTwitter className="text-xl group-hover:text-white" />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="w-9 h-9 rounded-full  flex items-center justify-center group hover:bg-primary transition-all
              duration-200"
              >
                <FaInstagram className="text-xl group-hover:text-white" />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="w-9 h-9 rounded-full  flex items-center justify-center group hover:bg-primary transition-all
              duration-200"
              >
                <FaPinterest className="text-xl group-hover:text-white" />
              </Link>
            </li>
          </ul>
          <p className="text-sm text-center mb-0">
            &#169; 2025 - Ecommerce Template
          </p>
          <div className="flex items-center gap-1">
            <img
              src="https://ecommerce-frontend-view.netlify.app/carte_bleue.png"
              alt="image"
            />
            <img
              src="https://ecommerce-frontend-view.netlify.app/visa.png"
              alt="image"
            />
            <img
              src="https://ecommerce-frontend-view.netlify.app/master_card.png"
              alt="image"
            />
            <img
              src="https://ecommerce-frontend-view.netlify.app/american_express.png"
              alt="image"
            />
            <img
              src="https://ecommerce-frontend-view.netlify.app/paypal.png"
              alt="image"
            />
          </div>
        </div>
      </div>

      {/* Cart Panel */}
      <Drawer
        open={context.opencart}
        onClose={context.toggleCartPanel(false)}
        anchor={"right"}
        className="cartPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-gray-400">
          <h1>Shopping Cart</h1>
          <IoMdClose
            className="text-xl cursor-pointer"
            onClick={context.toggleCartPanel(false)}
          />
        </div>
        <CartPannel />
      </Drawer>
    </>
  );
};
