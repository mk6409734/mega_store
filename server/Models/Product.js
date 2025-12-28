import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    brand: { type: String, default: "" },
    price: { type: Number, defaul: 0 },
    oldPrice: { type: Number, defaul: 0 },
    catName: { type: String, default: "" },
    catId: { type: String, default: "" },
    SubcatName: { type: String, default: "" },
    SubcatId: { type: String, default: "" },
    ThirdcatName: { type: String, default: "" },
    ThirdcatId: { type: String, default: "" },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true, 
       
      },
    countInStock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    Isfeatured: { type: Boolean, default: false },
    discount: { type: Number, required: true },
    productRam: [{ type: String, default: null }],
    size: [{ type: String, default: null }],
    productWeight: [{ type: String, default: null }],
    dateCreated: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", productSchema);
