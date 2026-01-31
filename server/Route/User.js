import { Router } from "express";
import {
  Register,
  GoogleLogin,
  VerifyEmail,
  Login,
  Logout,
  UserAvatar,
  RemoveImage,
  UpdateUser,
  Forgotpassword,
  VerifyForgotpassword,
  Resetpassword,
  RefreshToken,
  UserDetails,
  RegenrateOTP,
} from "../Controllers/User.js";
import { auth } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import { check } from "express-validator";

export const userRouter = Router();

userRouter.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),

    check("email", "Please input valid email").isEmail(),

    check(
      "password",
      "Please enter a password with 6 or more characters",
    ).isLength({
      min: 6,
    }),
  ],
  Register,
);
userRouter.post("/google-login", GoogleLogin);
userRouter.post(
  "/login",
  //**********************************Validations**********************************/
  [
    check("email", "Please input valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  Login,
);
userRouter.get("/logout", auth, Logout);
userRouter.post("/verifyemail", VerifyEmail);
userRouter.post("/re-genrateotp", RegenrateOTP);
userRouter.put("/user-avatar", auth, upload.array("avatar"), UserAvatar);
userRouter.delete("/delete-avatar", auth, RemoveImage);
userRouter.put("/update-user", auth, UpdateUser);
userRouter.post("/forgotpassword", Forgotpassword);
userRouter.post("/verifyforgotpassword", VerifyForgotpassword);
userRouter.post("/resetpassword", Resetpassword);
userRouter.post("/refresh-token", RefreshToken);
userRouter.get("/user-details", auth, UserDetails);
