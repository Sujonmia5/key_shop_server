import mongoose from "mongoose";
import { z } from "zod";

const reviewSchema = z.object({
  productId: z.string().refine(
    (val) => {
      return mongoose.Types.ObjectId.isValid(val);
    },
    { message: "Invalid" }
  ),
  rating: z.number().min(1).max(5),
  comment: z.string().max(500),
});
export const reviewZodSchema = {
  reviewSchema,
} as const;
