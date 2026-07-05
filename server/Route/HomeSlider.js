import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import {
  AddSlide,
  GetAllSlide,
  DeleteSlide,
  SetActiveSlide,
} from "../Controllers/HomeSlider.js";
export const SliderRouter = Router();

SliderRouter.post("/addslider", auth, upload.array("images"), AddSlide);
SliderRouter.get("/all", GetAllSlide);
SliderRouter.delete("/delete/:id", auth, DeleteSlide);
SliderRouter.put("/set-active/:id", auth, SetActiveSlide);
