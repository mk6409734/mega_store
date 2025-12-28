import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
}, {timestamps: true});

 export const CartModel = mongoose.model("cart", cartSchema);
 