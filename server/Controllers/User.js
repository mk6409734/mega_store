import { UserModel } from "../Models/User.js";
import bcryptjs from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { sendEmailFun } from "../Config/sendEmailFun.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import { generatedAccessToken } from "../utils/GenerateAccessToken.js";
import { generateRefreshToken } from "../utils/GenerateRefreshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      error: true,
      success: false,
    });
  }
  try {
    const { name, email, password } = req.body;
    let user;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    user = await UserModel.findOne({ email: email });
    if (user) {
      return res.json({
        message: "User already Registerd with this email",
        error: true,
        success: false,
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    user = new UserModel({
      name: name,
      email: email,
      password: password,
      otp: verifyCode,
      otp_expiry: Date.now() + 600000,
    });

    await user.save();

    // send verification email
    const { subject, text, html } = VerificationEmail(name, verifyCode);
    const verifyEmail = await sendEmailFun(email, subject, text, html);
    // Create a jwt token for verification purpose
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_TOKEN
    );

    return res.status(200).json({
      success: true,
      message: "User registered successfully!",
      token: token,
      user: { name, email },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const VerifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ error: true, success: false, message: "User not found" });
    }

    const isCodeValid = user.otp === otp;
    const isNotExpired = user.otp_expiry > Date.now();

    if (isCodeValid && isNotExpired) {
      (user.verify_email = true),
        (user.otp = null),
        (user.otp_expiry = null),
        await user.save();
      return res.status(200).json({
        error: false,
        success: true,
        message: "Email verified successfully",
      });
    } else if (!isCodeValid) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "otp is invalid",
      });
    } else {
      return res.status(400).json({
        error: true,
        success: false,
        message: "otp is Expired",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
export const RegenrateOTP = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ error: true, success: false, message: "User not found" });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = verifyCode;
    user.otp_expiry = Date.now() + 600000;
    await user.save();
    const { subject, text, html } = VerificationEmail(name, verifyCode);
    const verifyEmail = await sendEmailFun(email, subject, text, html);
    return res.status(200).json({
      error: false,
      success: true,
      message: "OTP Regenrated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      error: true,
      success: false,
    });
  }
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User not register",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Please contact to admin",
        error: true,
        success: false,
      });
    }
    if (user.verify_email !== true) {
      // send verification email
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const { subject, text, html } = VerificationEmail(user.name, verifyCode);
      const verifyEmail = await sendEmailFun(email, subject, text, html);
      user.otp = verifyCode;
      user.otp_expiry = Date.now() + 600000;
      await user.save();
      return res.status(400).json({
        message: "Your email is not verified",
        error: true,
        success: false,
      });
    }

    // const checkPassword = await bcryptjs.compare(password, user.password);
    const checkPassword = password === user.password ? true : false;

    if (!checkPassword) {
      return res.status(400).json({
        message: "Please check your password",
        error: true,
        success: false,
      });
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshtoken = await generateRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshtoken", refreshtoken, cookiesOption);

    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      email_verify: user.verify_email,
      data: {
        accesstoken,
        refreshtoken,
      },
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    const userId = req.userId; // auth middleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshtoken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.json({
      message: "Logout successfully",
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

// upload image from cloudinary
export const UserAvatar = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const userId = req.userId;

    // first remove image from cloudinary if exits
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const imgUrl = user.avatar;
    if (imgUrl && imgUrl.includes("cloudinary")) {
      const urlArr = imgUrl.split("/");
      const avatar_image = urlArr[urlArr.length - 1];
      const imageName = avatar_image.split(".")[0];
      if (imageName) {
        await cloudinary.uploader.destroy(imageName);
      }
    }
    // Use req.files for multer.array() or req.file for multer.single()
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
    (user.avatar = uploadedUrls[0]), await user.save();

    return res.status(200).json({
      _id: userId,
      avatar: uploadedUrls[0],
      message: "Avatar uploaded successfully",
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
export const RemoveImage = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

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

// update user details
export const UpdateUser = async (req, res) => {
  try {
    const userId = req.userId; // auth middleware
    const { name, email, mobile, password } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).send("The User cannot be Updated!");
    }

    let verifyCode = "";

    if (email !== user.email) {
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    }

    let hashPassword = "";

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    } else {
      hashPassword = user.password;
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name,
        email: email,
        mobile: mobile,
        verify_email: email !== user.email ? false : true,
        password: password,
        otp: verifyCode !== "" ? verifyCode : null,
        otp_expiry: verifyCode !== "" ? Date.now() + 600000 : "",
      },
      { new: true }
    );

    if (email !== user.email) {
      const { subject, text, html } = VerificationEmail(name, verifyCode);
      await sendEmailFun(email, subject, text, html);
    }

    return res.json({
      message: "User Updated successfully",
      error: false,
      success: true,
      user: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const Forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(500).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    (user.otp = verifyCode), (user.otp_expiry = Date.now() + 600000);

    await user.save();

    const { subject, text, html } = VerificationEmail(user.name, verifyCode);
    await sendEmailFun(email, subject, text, html);

    return res.json({
      message: "check your email",
      error: false,
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const VerifyForgotpassword = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide required field email, otp.",
        error: true,
        success: false,
      });
    }

    if (otp !== user.otp) {
      return res.status(400).json({
        message: "OTP is invalid",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.otp_expiry < currentTime) {
      return res.status(400).json({
        message: "OTP is expired",
        error: true,
        success: false,
      });
    }

    user.otp = "";
    user.otp_expiry = "";

    await user.save();

    return res.status(200).json({
      message: "OTP is Verified successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const Resetpassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message:
          "Provide required fields email, new password, confirm Password",
      });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "newPassword and confirmPassword must be same",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(confirmPassword, salt);

    user.password = confirmPassword;
    await user.save();

    return res.status(200).json({
      message: "password updated successfully",
      user: user,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const RefreshToken = async (req, res) => {
  try {
    const refresh_token =
      req.cookies.refresh_token || req?.headers?.authorization?.split(" ")[1];
    if (!refresh_token) {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }

    const verifyToken = jwt.verify(
      refresh_token,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "token is expired",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken?._id;
    const newAccessToken = await generatedAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookiesOption);

    return res.status(200).json({
      message: "New Access token generated",
      error: false,
      success: true,
      data: {
        access_token: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

// get login User Details
export const UserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    // const user = await UserModel.findById(userId).select('-password -refresh_token')
    const user = await UserModel.findById(userId);

    return res.status(200).json({
      message: "User details",
      data: user,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const GoogleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        message: "Google ID Token is required",
        error: true,
        success: false,
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("mohit-data", payload);
    const { sub, email, name, picture } = payload;

    let user = await UserModel.findOne({ email: email });

    if (!user) {
      // Create a account for first time google user
      user = new UserModel({
        name: name,
        email: email,
        avatar: picture,
        googleId: sub,
        verify_email: true,
        status: "Active",
      });
      await user.save();
    } else if (!user.googleId) {
      // If user exists but registered via email, link Google account
      user.googleId = sub;
      user.avatar = user.avatar || picture;
      user.verify_email = true;
      await user.save();
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshtoken = await generateRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshtoken", refreshtoken, cookiesOption);

    return res.status(200).json({
      message: "Login successfully with Google",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshtoken,
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Google Login failed",
      error: true,
      success: false,
    });
  }
};
