import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Login = () => {
  const [formfields, setFormfields] = useState({
    email: "",
    password: "",
  });

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setFormfields((prev) => ({ ...prev, [name]: value }));
  };

  const history = useNavigate();

  const forgotPassword = () => {
    if (formfields.email !== "") {
      history("/verify");
      toast.success("OTP Send");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formfields);
  };

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="card shadow-md w-md m-auto rounded-md bg-white p-5 px-10">
          <h1 className="text-xl text-center text-black font-semibold">
            Login to your account
          </h1>

          <form onSubmit={handleOnSubmit} className="w-full mt-5">
            <div className="form-group w-full mb-5">
              <TextField
                name="email"
                value={formfields.email}
                onChange={handleInputchange}
                type="email"
                id="outlined-basic"
                label="Email Id *"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="form-group w-full mb-5">
              <TextField
                name="password"
                value={formfields.password}
                onChange={handleInputchange}
                type="password"
                id="outlined-basic"
                label="Password *"
                variant="outlined"
                className="w-full"
              />
            </div>

            <a
              className="link cursor-pointer text-sm font-semibold"
              onClick={forgotPassword}
            >
              Forgort Password?
            </a>
            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                className="!bg-primary !px-3 !p-3 !rounded-md !text-white w-full"
              >
                Login
              </Button>
            </div>

            <p className="font-medium text-center mb-4 text-sm ">
              Not Registered?{" "}
              <Link
                to="/register"
                className="link text-primary text-sm font-semibold"
              >
                Register
              </Link>
            </p>
            <p className="font-medium text-center mb-3 text-sm">
              Or continue with social account
            </p>
            <Button className="flex gap-3 w-full !bg-[#f1f1f1] !text-black !p-3 !px-3 !rounded-md">
              <FcGoogle className="text-xl" />
              Login With Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
