import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ServerError } from "../middlewares/error.js";
import { HomeSlider } from "../Models/HomeSlider.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const AddSlide = async (req, res) => {
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

    const uploadPromises = files.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path, options);
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
        return result.secure_url;
      } catch (uploadError) {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const uploadedUrls = results.filter((url) => url !== null);

    if (!uploadedUrls.length) {
      return res.status(400).json({
        message: "No images were successfully uploaded",
        error: true,
        success: false,
      });
    }

    const slide = new HomeSlider({
      images: uploadedUrls,
    });

    await slide.save();

    return res.status(200).json({
      data: slide,
      message: "slide created successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    ServerError();
  }
};

export const GetAllSlide = async (req, res) => {
  try {
    const slides = await HomeSlider.find();

    if (!slides || !slides.length) {
      return res.status(404).json({
        message: "Sliders not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      data: slides,
      success: true,
      error: false,
    });
  } catch (error) {
    ServerError();
  }
};

export const DeleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HomeSlider.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        message: "Slide not found",
        success: true,
        error: true,
      });
    }
    return res.status(200).json({
      message: "Slide deleted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    ServerError();
  }
};

export const SetActiveSlide = async (req, res) => {
  try {
    const { id } = req.params;
    await HomeSlider.updateMany({}, { isActive: false });
    const updated = await HomeSlider.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({
        message: "Slide not found",
        success: false,
        error: true,
      });
    }
    return res.status(200).json({
      data: updated,
      message: "Slide activated successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    ServerError();
  }
};
