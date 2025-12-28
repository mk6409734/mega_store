import React, { useState } from "react";

import { Button } from "@mui/material";
import { BsBagCheckFill } from "react-icons/bs";
import { CartItems } from "./CartItems";

export const CartPage = () => {

  

  return (
    <section className="py-10 pb-10">
      <div className="container mx-auto w-[80%] max-w-[80%] flex gap-5">
        <div className="leftpart w-[70%] overflow-y-auto max-h-screen">
          <div className="shadow-md rounded-md p-2 bg-white">
            <div className="py-2 px-3 border-b border-gray-300">
              <h1 className="font-semibold">Your Cart</h1>
              <p className="mt-0 mb-5">
                There are <span className="font-bold text-primary">2</span>{" "}
                products in your cart
              </p>
            </div>
           <CartItems size="S" qty={1}/>
           <CartItems size="S" qty={1}/>
           <CartItems size="S" qty={1}/>
           <CartItems size="S" qty={1}/>
           <CartItems size="S" qty={1}/>
          </div>
        </div>

        <div className="rightpart w-[30%]">
          <div className="shadow-md rounded-md p-5 bg-white">
            <h1 className="pb-3 font-semibold">Cart Totals</h1>
            <hr className="pb-2" />
            <p className="flex items-center justify-between space-y-2">
              <span className="text-md">Subtotal</span>
              <span className="text-primary font-bold">₹1,300.00</span>
            </p>
            <p className="flex items-center justify-between space-y-2">
              <span className="text-md">Shipping</span>
              <span className="text-primary font-bold">Free</span>
            </p>
            <p className="flex items-center justify-between space-y-2">
              <span className="text-md">Estimate For</span>
              <span className="text-primary font-bold">United Kingdom</span>
            </p>
            <p className="flex items-center justify-between space-y-2">
              <span className="text-md">Total</span>
              <span className="text-primary font-bold">1,300.00</span>
            </p>
            <br />
            <Button className="btn-org w-full flex gap-2 items-center">
              <BsBagCheckFill className="h-4 w-4" />
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
