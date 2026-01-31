import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FrontStore } from "../../Store/Store";

export const ForgotPassword = () => {
  const [formfields, setFormfields] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { ResetPassword } = FrontStore();

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setFormfields((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await ResetPassword({
      email,
      newPassword: formfields.newPassword,
      confirmPassword: formfields.confirmPassword,
    });
    if (res.success) {
      localStorage.removeItem("userEmail")
      localStorage.removeItem("UserName")
      localStorage.removeItem("actionType")
      navigate("/login");
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="card shadow-md w-md m-auto rounded-md bg-white p-5 px-10">
          <div className="flex items-center justify-center mb-5">
            <img
              src="./forgot-password.png"
              width={100}
              alt="imageforgotpassword"
            />
          </div>
          <h1 className="text-xl text-center text-black font-semibold">
            Forgot Password
          </h1>

          <form onSubmit={handleOnSubmit} className="w-full mt-5">
            <div className="form-group w-full mb-5">
              <TextField
                name="newPassword"
                value={formfields.newPassword}
                onChange={handleInputchange}
                type="password"
                id="outlined-basic"
                label="New Password *"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="form-group w-full mb-5">
              <TextField
                name="confirmPassword"
                value={formfields.confirmPassword}
                onChange={handleInputchange}
                type="password"
                id="outlined-basic"
                label="Confirm Password *"
                variant="outlined"
                className="w-full"
              />
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                className="!bg-primary !px-3 !p-3 !rounded-md !text-white w-full"
              >
                Change Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
