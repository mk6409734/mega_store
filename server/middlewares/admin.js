import { UserModel } from "../Models/User.js";

export const admin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (user.role !== "Admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
        error: true,
        success: false,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};
