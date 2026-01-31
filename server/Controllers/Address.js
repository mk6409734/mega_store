import { AddressModel } from "../Models/Address.js";
import { UserModel } from "../Models/User.js";

export const AddAddress = async (req, res) => {
  try {
    const { address_line1, city, state, pincode, country, mobile, status } =
      req.body;

    if (!address_line1 || !city || !state || !pincode || !country) {
      return res.status(400).json({
        message: "Please fill all required fields",
        error: true,
        success: false,
      });
    }

    const userId = req.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Check if address already exists for this user
    let address = await AddressModel.findOne({ userId });

    if (address) {
      // Update existing address
      address = await AddressModel.findOneAndUpdate(
        { userId },
        {
          $set: {
            address_line1,
            city,
            state,
            pincode,
            country,
            mobile,
            status,
          },
        },
        { new: true },
      );

      return res.status(200).json({
        address,
        message: "Address updated successfully",
        success: true,
        error: false,
      });
    } else {
      // Create new address
      const newAddress = new AddressModel({
        address_line1,
        city,
        state,
        pincode,
        country,
        mobile,
        status,
        userId,
      });

      await newAddress.save();

      await UserModel.updateOne(
        { _id: userId },
        {
          $push: {
            address_details: newAddress._id,
          },
        },
      );

      return res.status(200).json({
        address: newAddress,
        message: "Address added successfully",
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

export const GetAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const address = await AddressModel.find({ userId });
    if (!address) {
      return res.status(400).json({
        message: "Address not found",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      address,
      message: "Address fetched successfully",
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
