import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Dashboard } from "./Pages/Dashboard";
import { Login } from "./Pages/login/Login";
import { SignUp } from "./Pages/SignUp/SignUp";
import { Products } from "./Pages/Products/Products";
import { AdminLayout } from "./Components/AdminLayout";
import HomeSliderBanner from "./Pages/HomeSliderBanner/HomeSliderBanner";
import CategoryList from "./Pages/CategoryList/CategoryList";
import SubCategoryList from "./Pages/SubCategoryList/SubCategoryList";
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword";
import { VerifyAccount } from "./Pages/VerifyAccount/VerifyAccount";
import { ChangePassword } from "./Pages/ChangePassword/ChangePassword";

export const Router = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/products"} element={<Products />} />
          <Route path={"/homeslider/list"} element={<HomeSliderBanner />} />
          <Route path={"/category/list"} element={<CategoryList />} />
          <Route path={"/subcategory/list"} element={<SubCategoryList />} />
          <Route path={"/users"} element={<Users />} />
          <Route path={"/orders"} element={<Orders />} />
        </Route>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/verify-account"} element={<VerifyAccount />} />
        <Route path={"/change-password"} element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
};
