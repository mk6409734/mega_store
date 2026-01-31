import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FrontStore } from "../Store/Store";
import { GoogleLogin } from "@react-oauth/google";

export const Login = () => {
  const [formfields, setFormfields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");

  const {
    Login,
    islogin,
    setIsLogin,
    GoogleLogin: handleGoogleLoginAction,
    ForgotPassword,
  } = FrontStore();
  
  const navigate = useNavigate();
  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setFormfields((prev) => ({ ...prev, [name]: value }));
  };

  const forgotPassword = async () => {
    if (formfields.email === "") {
      toast.error("Please enter email ID");
      return false;   
    }else{
      const res = await ForgotPassword(formfields.email);
      console.log("res",res);
      toast.success(`OTP Send to ${formfields.email}`)
      navigate("/verify");   
      localStorage.setItem("userEmail", formfields.email)
      localStorage.setItem("UserName", res.user.name)
      localStorage.setItem("actionType", "forgot-password")

    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const res = await handleGoogleLoginAction(credentialResponse.credential);
    if (res?.success) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  useEffect(() => {
    if (islogin) {
      navigate("/");
    }
  }, [islogin, navigate]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    const res = await Login(formfields); 
    if (res.success) {
      navigate("/");
    }else{
      setErrors(res?.message || "Login Failed")
    }
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
                
                label="Password *"
                variant="outlined"
                className="w-full"
              />
            </div>
            {errors && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 mb-5">
                {errors}
              </div>
            )}
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
            <div className="flex items-center justify-center">
              <GoogleLogin
                className="w-full"
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  setErrors("Google Login Failed");
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
