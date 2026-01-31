import React, { useState } from "react";
import { OtpBox } from "../../components/OtpBox";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FrontStore } from "../../Store/Store";

export const Verify = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { VerifyOtp, ReGenOtp, VerifyForgotPassword } = FrontStore();
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
      const res = await VerifyForgotPassword({email, otp})
     if(res.success){
      navigate("/forgot-password")
     }
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
              <Button
                onClick={handleReGen}
                disabled={isButtonDisabled}
                className="text-primary btn-org disabled:!opacity-50 disabled:!cursor-not-allowed"
              >
                {isButtonDisabled ? `Re-generate in ${timer}s` : "Re-generate"}
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
