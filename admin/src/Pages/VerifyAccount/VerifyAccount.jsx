import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiLogin, CiUser } from "react-icons/ci";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { OtpBox } from "./OtpBox";
import { FrontStore } from "../../../../frontend/src/Store/Store";
import { useNavigate } from "react-router-dom";
import { adminStore } from "../../Store/Store";

export const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { VerifyOtp, ReGenOtp, VerifyForgotPassword } = adminStore();
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const name = localStorage.getItem("UserName");

  // Timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isButtonDisabled) {
      setIsButtonDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer, isButtonDisabled]);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleReGen = () => {
    ReGenOtp({ name, email });
    // Start 60 second countdown
    setTimer(60);
    setIsButtonDisabled(true);
  };

  const actionType = localStorage.getItem("actionType");

  const handleformSubmit = async (e) => {
    e.preventDefault();
    if (actionType !== "forgot-password") {
      const res = await VerifyOtp({ email, otp });
      if (res.success) {
        setOtp("");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        navigate("/login");
      }
    } else {
      const res = await VerifyForgotPassword({ email, otp });
      if (res.success) {
        navigate("/change-password");
      }
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
          <div className="flex items-center justify-center">
            <Button
              onClick={handleReGen}
              disabled={isButtonDisabled}
              className="!bg-primary !text-white disabled:!opacity-50 disabled:!cursor-not-allowed"
            >
              {isButtonDisabled ? `Re-generate in ${timer}s` : "Re-generate"}
            </Button>
          </div>
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
