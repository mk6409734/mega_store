import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiLogin, CiUser } from "react-icons/ci";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { OtpBox } from "./OtpBox";
import { FrontStore } from "../../../../frontend/src/Store/Store";
import { Link, useNavigate } from "react-router-dom";

export const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const { VerifyOtp } = FrontStore();
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleformSubmit = async (e) => {
    e.preventDefault();
    const res = await VerifyOtp({ email, otp });
    if (res?.success) {
      navigate("/");
    }
  };
 

  return (
    <section className="bg-white w-full h-screen fixed top-0 left-0">
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
          <img src="./shield.png" alt="logo" className="m-auto w-16 md:w-24" />
        </div>
        <Typography variant="h3" gutterBottom className="!text-center !mt-5">
          Welcome back! <br />
          Please verify your Otp
        </Typography>

        <br />

        <form className="space-y-5" onSubmit={handleformSubmit}>
          <p className="text-center">
            OTP Send to{" "}
            <span
              className="
            text-primary font-bold"
            >
              {email}
            </span>
          </p>
          <OtpBox length={6} onChange={handleOtpChange} />

          <div className="flex items-center justify-center ">
            <Button type="submit" className="w-1/2 !text-white  !bg-primary ">
              Verify otp
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
