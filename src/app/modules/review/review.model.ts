import mongoose, { Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const MReview = mongoose.model("Review", reviewSchema);
