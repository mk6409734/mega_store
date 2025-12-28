import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { addtoMyList, DeleteMyList, getMyList } from "../Controllers/MyList.js";

export const MyListRouter = Router();

MyListRouter.post("/addtomylist", auth, addtoMyList);
MyListRouter.get("/getmylist", auth, getMyList);
MyListRouter.delete("/deletemylist/:id", auth, DeleteMyList);