import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiLogin, CiUser } from "react-icons/ci";
import "./login.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export const Login = () => {
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
          Welcome Back! <br />
          Sign in with your credentials.
        </Typography>
        <div className="flex items-center justify-center gap-5 w-full mt-5">
          {" "}
          <Button
            className="!capitalize px-1 md:!px-5 !text-gray-500"
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FcGoogle />}
            loading={loadinggooogle}
            loadingPosition="end"
            variant="outlined"
          >
            Signin with Google
          </Button>
          <Button
            className="!capitalize px-1 md:!px-5 !text-gray-500"
            size="small"
            onClick={handleClickfacebook}
            endIcon={<BsFacebook />}
            loading={loadingfacebook}
            loadingPosition="end"
            variant="outlined"
          >
            Signin with Facebook
          </Button>
        </div>

        <br />

        <div className="w-full flex items-center justify-center gap-3 font-urbanist">
          <span className="flex items-center w-26 h-[1px] bg-gray-400"></span>
          <span className="text-sm">Or, Sign in with your Email</span>
          <span className="flex items-center w-26 h-[1px] bg-gray-400"></span>
        </div>

        <br />

        <form className="w-full px-8 mt-3">
          <div className="mb-4 w-full flex flex-col gap-3">
            <label className="font-medium">Email</label>
            <input
              type="email"
              className="w-full h-12 border border-gray-300 rounded-md focus:border-[#1f2322] focus:outline-none px-3"
            />
          </div>
          <div className="mb-4 w-full flex flex-col gap-3">
            <label className="font-medium">Password</label>
            <input
              type="password"
              className="w-full h-12 border border-gray-300 rounded-md focus:border-[#1f2322] focus:outline-none px-3"
            />
          </div>

          <div className="checkbox flex items-center justify-between">
            <div>
              <FormControlLabel control={<Checkbox />} label="Remember Me" />
            </div>

            <div>
              <Link to="/forgot-password">
                <h1 className="underline font-semibold text-sm">
                  Forgot Password?
                </h1>
              </Link>
            </div>
          </div>
          <div className="mt-3">
            <Button className="!capitalize !bg-[#1f2322] !w-full !text-white !py-3">
              Log In
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
