import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FrontStore } from "../Store/Store";
import { GoogleLogin } from "@react-oauth/google";

export const Register = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const {
    Register,
    GoogleLogin: handleGoogleLoginAction,
    loading,
  } = FrontStore();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    const res = await handleGoogleLoginAction(credentialResponse.credential);
    if (res?.success) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    const res = await Register(formFields);
    if (res?.success) {
      setErrors("");
      localStorage.setItem("userEmail", formFields.email);

      navigate("/verify");
    } else {
      setErrors(res?.message || "Registration failed");
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="card shadow-md w-md m-auto rounded-md bg-white p-5 px-10">
          <h1 className="text-xl text-center text-black font-semibold">
            Register with a new account
          </h1>

          <form onSubmit={handleSubmit} className="w-full mt-5">
            <div className="form-group w-full mb-5">
              <TextField
                name="name"
                value={formFields.name}
                onChange={handleChange}
                type="text"
                id="name"
                label="Full Name"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="form-group w-full mb-5">
              <TextField
                name="email"
                value={formFields.email}
                onChange={handleChange}
                type="email"
                id="email"
                label="Email Id *"
                variant="outlined"
                className="w-full"
                required={false}
              />
            </div>
            <div className="form-group w-full mb-5">
              <TextField
                name="password"
                value={formFields.password}
                onChange={handleChange}
                type="password"
                id="password"
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

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                disabled={loading === true ? true : false}
                type="submit"
                className="!bg-primary !px-3 !p-3 !rounded-md !text-white w-full"
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>

            <p className="font-medium text-center mb-4 text-sm ">
              Already have an account?{" "}
              <Link
                to="/login"
                className="link text-primary text-sm font-semibold"
              >
                Login
              </Link>
            </p>
            <p className="font-medium text-center mb-3 text-sm">
              Or continue with social account
            </p>
            <div className="flex justify-center w-full">
              <GoogleLogin
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
