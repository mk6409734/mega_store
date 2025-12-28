import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  getCategoryCount,
  getSubCategoryCount,
  RemoveCategoryImage,
  UpdateCategory,
  uploadImages,
} from "../Controllers/Category.js";
import { upload } from "../middlewares/multer.js";

export const categoryRouter = Router();

categoryRouter.post(
  "/uploadimages",
  auth,
  upload.array("images"),
  uploadImages
);
categoryRouter.post("/createcategory", auth, createCategory);
categoryRouter.get("/getcategory", getCategory);
categoryRouter.get("/getcategory-count", getCategoryCount);
categoryRouter.get("/getsubcategory-count", getSubCategoryCount);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.delete("/deleteimage", auth, RemoveCategoryImage);
categoryRouter.delete("/:id", auth, deleteCategory);
categoryRouter.put("/:id", auth, UpdateCategory);
