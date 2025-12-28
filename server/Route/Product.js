import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import {
  CreateProduct,
  deleteProduct,
  getAllProduct,
  getAllProductByCatId,
  getAllProductByCatName,
  getAllProductByCount,
  getAllProductByFeatured,
  getAllProductByPrice,
  getAllProductByRating,
  getAllProductBySubCatId,
  getAllProductBySubCatName,
  getAllProductByThirdCatId,
  getAllProductByThirdCatName,
  getProduct,
  RemoveProductImage,
  UpdateProduct,
  uploadImages,
} from "../Controllers/Product.js";

export const ProductRouter = Router();

ProductRouter.post("/uploadimages", auth, upload.array("images"), uploadImages);
ProductRouter.post("/create-product", auth, CreateProduct);
ProductRouter.get("/getallproducts", getAllProduct);
ProductRouter.get("/getallproductsbyid/:id", getAllProductByCatId);
ProductRouter.get("/getallproductsbycatname", getAllProductByCatName);
ProductRouter.get("/getallproductsbysubcatname", getAllProductBySubCatName);
ProductRouter.get("/getallproductsbysubcatid/:id", getAllProductBySubCatId);
ProductRouter.get("/getallproductsbythirdcatname", getAllProductByThirdCatName);
ProductRouter.get("/getallproductsbythirdcatid/:id", getAllProductByThirdCatId);
ProductRouter.get("/getallproductsbyprice", getAllProductByPrice);
ProductRouter.get("/getallproductsbyrating", getAllProductByRating);
ProductRouter.get("/getallproductsbycount", getAllProductByCount);
ProductRouter.get("/getallproductsbyfeatured", getAllProductByFeatured);
ProductRouter.delete("/deleteimage", auth, RemoveProductImage);
ProductRouter.delete("/:id", deleteProduct);
ProductRouter.get("/:id", getProduct);
ProductRouter.put("/updateproduct/:id", auth, UpdateProduct);
