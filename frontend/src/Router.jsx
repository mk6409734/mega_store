import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Home } from "./pages/home";
import { Order_tracking } from "./components/order-tracking";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ProductListing } from "./pages/ProductListing";
import { Footer } from "./components/Footer";
import { ProductDetails } from "./pages/ProductDetails";
import { CartPage } from "./pages/Cart/CartPage";
import { Verify } from "./pages/Verify";
import { Toaster } from "react-hot-toast";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Checkout } from "./pages/Checkout";
import { MyAccount } from "./pages/MyAccount";
import { MyList } from "./pages/MyList/MyList";
import { Orders } from "./pages/Orders";

export const Router = ({ values, context }) => {
  const Context = context;
  return (
    <BrowserRouter>
      <Context.Provider value={values}>
        <Header />
        <Toaster />
        <Routes>
          <Route path={"/"} exact={true} element={<Home />} />
          <Route
            path={"/productlisting"}
            exact={true}
            element={<ProductListing />}
          />
          <Route
            path={"/order_tracking"}
            exact={true}
            element={<Order_tracking />}
          />
          <Route
            path={"/productdetails/:id"}
            exact={true}
            element={<ProductDetails />}
          />
          <Route path={"/login"} exact={true} element={<Login />} />
          <Route path={"/register"} exact={true} element={<Register />} />
          <Route path={"/cart"} exact={true} element={<CartPage />} />
          <Route path={"/verify"} exact={true} element={<Verify />} />
          <Route
            path={"/forgot-password"}
            exact={true}
            element={<ForgotPassword />}
          />
          <Route path={"/checkout"} exact={true} element={<Checkout />} />
          <Route path={"/my-account"} exact={true} element={<MyAccount />} />
          <Route path={"/my-list"} exact={true} element={<MyList />} />
          <Route path={"/my-orders"} exact={true} element={<Orders />} />
        </Routes>
        <Footer />
      </Context.Provider>
    </BrowserRouter>
  );
};
