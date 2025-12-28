import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiLogin, CiUser } from "react-icons/ci";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const ForgotPassword = () => {
  const [loadinggooogle, setLoadingGoogle] = useState(false);
  const [loadingfacebook, setLoadingFacebook] = useState(false);
  function handleClickGoogle() {
    setLoadingGoogle(true);
  }
  function handleClickfacebook() {
    setLoadingFacebook(true);
  }
  return (
    <section className="bg-white w-full h-full fixed top-0 left-0 overflow-y-auto">
      <header className="w-full fixed top-0 left-0 px-7 py-2 z-50 flex  items-center justify-between">
        <Link to="/">
          <img src="./logo.png" alt="logo" className="w-24 md:w-44" />
        </Link>

        <div className="flex items-center gap-3">
          <NavLink to="/login" end>
            {({ isActive }) => (
              <Button
                className={`!rounded-full !px-2 md:!px-5 !flex !gap-1 !capitalize ${
                  isActive ? "!bg-gray-100 !text-gray-800" : "!text-gray-800"
                }`}
              >
                <CiLogin className="text-lg" />
                Login
              </Button>
            )}
          </NavLink>
          <NavLink to="/signup" end>
            {({ isActive }) => (
              <Button
                className={`!rounded-full !px-2 md:!px-5 !flex !gap-1 !capitalize ${
                  isActive ? "!bg-gray-100 !text-gray-800" : "!text-gray-800"
                }`}
              >
                <CiUser className="text-lg" />
                Sign up
              </Button>
            )}
          </NavLink>
        </div>
      </header>{" "}
      <img
        src="./bg.jpg"
        alt=""
        className="w-full fixed top-0 left-0 opacity-20"
      />
      <div className="w-2xs md:w-2xl h-full mx-auto mt-22 relative z-50 opacity-100">
        <div className="text-center">
          <img
            src="./logo-only.png"
            alt="logo"
            className="m-auto w-16 md:w-24"
          />
        </div>
        <Typography variant="h3" gutterBottom className="!text-center !mt-5">
          Having trouble to sign in? <br />
          Please verify your Email
        </Typography>

        <br />

        <br />

        <form className="w-full px-8 mt-3">
          <div className="mb-4 w-full flex flex-col gap-3">
            <label className="font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-12 border border-gray-300 rounded-md focus:border-[#1f2322] focus:outline-none px-3"
            />
          </div>

          <div className="mt-3">
            <Link to="/verify-account">
              <Button className="!capitalize !bg-[#1f2322] !w-full !text-white !py-3">
                Reset Password
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center mt-5 gap-2">
            <span>Don't want to reset?</span>{" "}
            <Link
              className="text-primary hover:underline hover:text-gray-700"
              to="/signup"
            >
              Sign In?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
