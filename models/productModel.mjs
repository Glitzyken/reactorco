import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    price: {
      type: Number,
    },
    available: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      enum: ["Regular", "Premium"],
      default: "Regular",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
