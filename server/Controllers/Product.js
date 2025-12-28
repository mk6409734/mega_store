import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ProductModel } from "../Models/Product.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImages = async (req, res) => {
  try {
    const files = req.files || (req.file ? [req.file] : []);

    if (!files.length) {
      return res.status(400).json({
        message: "No files provided",
        error: true,
        success: false,
      });
    }

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    const uploadedUrls = [];

    // Upload each file and wait for completion
    for (const file of files) {
      try {
        const result = await cloudinary.uploader.upload(file.path, options);
        uploadedUrls.push(result.secure_url);
        // Clean up temporary file after successful upload
        fs.unlinkSync(file.path);
        console.log(`Uploaded: ${file.filename}`);
      } catch (uploadError) {
        console.error(`Error uploading ${file.filename}:`, uploadError);
        // Clean up file even if upload failed
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }

    if (!uploadedUrls.length) {
      return res.status(400).json({
        message: "No images were successfully uploaded",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      image: uploadedUrls,
      message: "image uploaded successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const CreateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      images,
      brand,
      price,
      oldPrice,
      catName,
      catId,
      SubcatName,
      SubcatId,
      ThirdcatName,
      ThirdcatId,
      countInStock,
      rating,
      Isfeatured,
      discount,
      productRam,
      size,
      productWeight,
    } = req.body;

    const product = new ProductModel({
      name,
      description,
      images,
      brand,
      price,
      oldPrice,
      catName,
      catId,
      SubcatName,
      SubcatId,
      ThirdcatName,
      ThirdcatId,
      countInStock,
      rating,
      Isfeatured,
      discount,
      productRam,
      size,
      productWeight,
    });

    await product.save();

    if (!product) {
      return res.status(400).json({
        message: "Product not created!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product created successfully",
      data: product,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = parseInt(req.query.perpage);
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perpage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ message: "page not found", error: true, success: false });
    }
    const product = await ProductModel.find()
      .populate("Category")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .exec();
    if (!product) {
      return res.status(400).json({
        message: "Product not exist!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Avalable Products fetched successfully",
      data: product,
      totalPages,
      page,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// for category

export const getAllProductByCatId = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = parseInt(req.query.perpage);
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perpage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ message: "page not found", error: true, success: false });
    }
    const product = await ProductModel.find({ catId: req.params.id })
      .populate("category")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .exec();
    if (!product) {
      return res.status(400).json({
        message: "Product not exist!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Avalable Products fetched successfully",
      data: product,
      totalPages,
      page,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductByCatName = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = parseInt(req.query.perpage);
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perpage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ message: "page not found", error: true, success: false });
    }
    const product = await ProductModel.find({ catName: req.query.catName })
      .populate("Category")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .exec();
    if (!product) {
      return res.status(400).json({
        message: "Product not exist!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Avalable Products fetched successfully",
      data: product,
      totalPages,
      page,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// for sub category

export const getAllProductBySubCatId = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = parseInt(req.query.perpage);
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perpage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ message: "page not found", error: true, success: false });
    }
    const product = await ProductModel.find({ SubcatId: req.params.id })
      .populate("Category")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .exec();
    if (!product) {
      return res.status(400).json({
        message: "Product not exist!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Avalable Products fetched successfully",
      data: product,
      totalPages,
      page,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductBySubCatName = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = parseInt(req.query.perpage);
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perpage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ message: "page not found", error: true, success: false });
    }
    const product = await ProductModel.find({
      SubcatName: req.query.SubcatName,
    })
      .populate("Category")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .exec();
    if (!product) {
      return res.status(400).json({
        message: "Product not exist!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Avalable Products fetched successfully",
      data: product,
      totalPages,
      page,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// for third sub category

export const getAllProductByThirdCatId = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = parseInt(req.query.perpage);
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perpage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ message: "page not found", error: true, success: false });
    }
    const product = await ProductModel.find({ ThirdcatId: req.params.id })
      .populate("Category")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .exec();
    if (!product) {
      return res.status(400).json({
        message: "Product not exist!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Avalable Products fetched successfully",
      data: product,
      totalPages,
      page,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductByThirdCatName = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = parseInt(req.query.perpage);
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perpage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ message: "page not found", error: true, success: false });
    }
    const product = await ProductModel.find({
      ThirdcatName: req.query.ThirdcatName,
    })
      .populate("Category")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .exec();
    if (!product) {
      return res.status(400).json({
        message: "Product not exist!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Avalable Products fetched successfully",
      data: product,
      totalPages,
      page,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductByPrice = async (req, res) => {
  try {
    let productList = [];
    if (req.query.catId != "" && req.query.catId !== undefined) {
      const product = await ProductModel.find({
        catId: req.query.catId,
      }).populate("Category");

      productList.push(product);
    }

    if (req.query.SubcatId != "" && req.query.SubcatId !== undefined) {
      const product = await ProductModel.find({
        SubcatId: req.query.SubcatId,
      }).populate("Category");

      productList.push(product);
    }

    if (req.query.ThirdcatId != "" && req.query.ThirdcatId !== undefined) {
      const product = await ProductModel.find({
        ThirdcatId: req.query.ThirdcatId,
      }).populate("Category");

      productList.push(product);
    }

    const filteredProducts = productList.filter((product) => {
      if (req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
        return false;
      }
      if (req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
        return false;
      }
      return true;
    });

    return res.status(200).json({
      products: filteredProducts,
      totalPages: 0,
      page: 0,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// get all products by rating
export const getAllProductByRating = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = parseInt(req.query.perpage);
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perpage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ message: "page not found", error: true, success: false });
    }

    let product;

    if (req.query.catId !== undefined) {
      product = await ProductModel.find({
        rating: req.query.rating,
        catId: req.query.catId,
      })
        .populate("Category")
        .skip((page - 1) * perpage)
        .limit(perpage)
        .exec();
    }

    if (req.query.SubcatId !== undefined) {
      product = await ProductModel.find({
        rating: req.query.rating,
        SubcatId: req.query.SubcatId,
      })
        .populate("Category")
        .skip((page - 1) * perpage)
        .limit(perpage)
        .exec();
    }

    if (req.query.ThirdcatId !== undefined) {
      product = await ProductModel.find({
        rating: req.query.rating,
        ThirdcatId: req.query.ThirdcatId,
      })
        .populate("Category")
        .skip((page - 1) * perpage)
        .limit(perpage)
        .exec();
    }

    if (!product) {
      return res.status(400).json({
        message: "Product not exist!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Avalable Products fetched successfully",
      data: product,
      totalPages,
      page,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// get all products by count

export const getAllProductByCount = async (req, res) => {
  try {
    const productsCount = await ProductModel.countDocuments();

    if (!productsCount) {
      return res.status(400).json({
        message: "Product not exist!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Avalable Products fetched successfully",
      productsCount,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// get all products by Isfeatured property
export const getAllProductByFeatured = async (req, res) => {
  try {
    const product = await ProductModel.find({ Isfeatured: true }).populate(
      "Category"
    );

    if (!product) {
      return res.status(400).json({
        message: "Product not exist!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Avalable Products fetched successfully",
      product,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// delete Product by ID

export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(400).json({
        message: "Product not found!",
        error: true,
        success: false,
      });
    }
    const images = product.images;

    for (let img of images) {
      const urlArr = img.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (!imageName) {
        return res.status(400).json({
          message: "Invalid image URL",
          error: true,
          success: false,
        });
      }
      const destroyResult = await cloudinary.uploader.destroy(imageName);
    }

    const deleteproduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deleteproduct) {
      return res.status(400).json({
        message: "Product not deleted!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// get single Product
export const getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "category"
    );

    if (!product) {
      return res.status(400).json({
        message: "Product not found!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      product,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Remove image from cloudinary
export const RemoveProductImage = async (req, res) => {
  try {
    const imageUrl = req.query.img;

    if (!imageUrl) {
      return res.status(400).json({
        message: "Image URL is required",
        error: true,
        success: false,
      });
    }

    const urlArr = imageUrl.split("/");
    const image = urlArr[urlArr.length - 1];
    const imageName = image.split(".")[0];

    if (!imageName) {
      return res.status(400).json({
        message: "Invalid image URL",
        error: true,
        success: false,
      });
    }

    const destroyResult = await cloudinary.uploader.destroy(imageName);

    return res.status(200).json({
      message: "Image removed successfully",
      success: true,
      error: false,
      data: destroyResult,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      description,
      images,
      brand,
      price,
      oldPrice,
      catName,
      catId,
      SubcatName,
      SubcatId,
      ThirdcatName,
      ThirdcatId,
      category,

      countInStock,
      rating,
      Isfeatured,
      discount,
      productRam,
      size,
      productWeight,
    } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        images,
        brand,
        price,
        oldPrice,
        catName,
        catId,
        SubcatName,
        SubcatId,
        ThirdcatName,
        ThirdcatId,
        category,

        countInStock,
        rating,
        Isfeatured,
        discount,
        productRam,
        size,
        productWeight,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(400).json({
        message: "Product not Updated!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
