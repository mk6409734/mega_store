import { CategoryModel } from "../Models/Category.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// upload categoryimage to cloudinary

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

export const createCategory = async (req, res) => {
  try {
    const { name, images, parentCatName, parentId } = req.body;

    // Validate input
    if (!name || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        message: "Name and at least one image are required",
        error: true,
        success: false,
      });
    }

    let category = new CategoryModel({
      name,
      images, // Use passed-in images instead of module-level variable
      parentCatName,
      parentId,
    });

    category = await category.save();

    return res.status(200).json({
      message: "Category created",
      success: true,
      error: false,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    const categoryMap = {};

    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat._doc, children: [] };
    });

    const rootCategories = [];

    categories.forEach((cat) => {
      if (cat.parentId) {
        categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });

    return res.status(200).json({
      data: rootCategories,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategoryCount = async (req, res) => {
  try {
    const categoriesCount = await CategoryModel.countDocuments({
      parentId: undefined,
    });

    if (!categoriesCount) {
      return res.status(400).json({
        message: "Category not exist",
        error: true,
        success: false,
      });
    } else {
      return res.status(200).json({
        categoryCount: categoriesCount,
        success: true,
        error: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getSubCategoryCount = async (req, res) => {
  try {
    const Counts = await CategoryModel.find();

    if (!Counts) {
      return res.status(400).json({
        message: "Category not exist",
        error: true,
        success: false,
      });
    } else {
      const subcatArr = [];
      for (let count of Counts) {
        if (count.parentId !== undefined) {
          subcatArr.push(count);
        }
      }
      return res.status(200).json({
        subcategoryCount: subcatArr.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);

    if (!category) {
      return res.status(400).json({
        message: "the Category with the given Id was not found.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      data: category,
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
export const RemoveCategoryImage = async (req, res) => {
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

export const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    const images = category.images;

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

    const subCategory = await CategoryModel.find({ parentId: req.params.id });

    for (let sub of subCategory) {
      const thirdSubCategory = await CategoryModel.find({
        parentId: sub._id,
      });

      for (let thirdSub of thirdSubCategory) {
        await CategoryModel.findByIdAndDelete(thirdSub._id);
      }

      await CategoryModel.findByIdAndDelete(sub._id);
    }
    const deleteCategory = await CategoryModel.findByIdAndDelete(req.params.id);

    if (!deleteCategory) {
      res.status(400).json({
        message: "Category not found!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category Deleted!",
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

export const UpdateCategory = async (req, res) => {
  try {
    const { name, images, parentId, parentCatName } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      { name, images, parentCatName, parentId },
      { new: true }
    );  

    if (!category) {
      res.status(400).json({
        message: "Category cannot be updated!",
        error: true,
        success: false,
      });
    }

    return res.status(201).json({
      message:"Category updated successfully",
      category,
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
