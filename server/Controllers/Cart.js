import { CartModel } from "../Models/Cart.js";
import { UserModel } from "../Models/User.js";

export const addtoCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(401).json({
        message: "Provide productId",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartModel.findOne({
      userId,
      productId,
    });

    if (checkItemCart) {
      return res.status(400).json({
        message: "Item already in cart",
      });
    }

    const cartItem = new CartModel({
      quantity: 1,
      userId,
      productId,
    });

    await cartItem.save();

    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

    return res.status(200).json({
      data: cartItem,
      message: "Item add successfully",
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

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cartItem = await CartModel.find({ userId }).populate("productId");

    return res.status(200).json({
      data: cartItem,
      message: "Item fetched successfully",
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

export const DeleteCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, productId } = req.body;

    if (!_id) {
      return res.status(401).json({
        message: "Provide _id",
        error: true,
        success: false,
      });
    }

    const deleteCartItem = await CartModel.deleteOne({ _id, userId });

    if (!deleteCartItem) {
      return res.status(404).json({
        message: "the product in the cart is not found",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ _id: userId });
    const cartItems = user?.shopping_cart || [];

    const updatedUserCart = cartItems.filter(
      (id) => id.toString() !== productId.toString()
    );

    user.shopping_cart = updatedUserCart;
    await user.save();

    return res.status(200).json({
      data: deleteCartItem,
      message: "Cart deleted successfully",
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

export const UpdateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, quantity } = req.body;

    if (!_id || !quantity) {
      return res.status(401).json({
        message: "Provide _id, quantity",
        error: true,
        success: false,
      });
    }

    const updateCartItem = await CartModel.updateOne(
      { _id, userId },
      { quantity }
    );

    return res.status(200).json({
      data: updateCartItem,
      message: "Cart updated successfully",
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
