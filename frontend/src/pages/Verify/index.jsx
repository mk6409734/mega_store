import React, { useState } from "react";
import { OtpBox } from "../../components/OtpBox";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FrontStore } from "../../Store/Store";

export const Verify = () => {
  const [otp, setOtp] = useState("");
  const { VerifyOtp, ReGenOtp } = FrontStore();
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const data = userStr ? JSON.parse(userStr) : null;

  const { name } = data;

  const email = localStorage.getItem("userEmail");

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleReGen = () => {
    ReGenOtp({ name, email });
  };

  const handleformSubmit = async (e) => {
    e.preventDefault();
    const res = await VerifyOtp({ email, otp });
    if (res.success) {
      setOtp("");
      navigate("/login");
      localStorage.removeItem("userEmail")
    }
  };

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="card shadow-md w-md m-auto rounded-md bg-white p-5 px-10 space-y-5">
          <div className="text-center flex items-center justify-center">
            <img src="./shield.png" alt="shild" width={80} />
          </div>
          <h3 className="text-center text-xl text-black">Verify OTP</h3>

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
            <div>
              <Button onClick={handleReGen} className="text-primary btn-org">
                Re-genrate
              </Button>
            </div>

            <div className="flex items-center justify-center ">
              <Button type="submit" className="w-full btn-org btn-lg">
                Verify
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
