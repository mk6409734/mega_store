import { Router } from "express";
import { auth } from "../middlewares/auth.js";

import { AddAddress, GetAddress } from "../Controllers/Address.js";
export const AddressRouter = Router();

AddressRouter.post("/add-address", auth, AddAddress);
AddressRouter.get("/get-address", auth, GetAddress);
