import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { addtoCart, DeleteCart, getCart, UpdateCart } from "../Controllers/Cart.js";
export const CartRouter = Router();

CartRouter.post("/addtocart", auth, addtoCart);
CartRouter.get("/getcart", auth, getCart);
CartRouter.put("/updatecart", auth, UpdateCart);
CartRouter.delete("/deletecart", auth, DeleteCart);