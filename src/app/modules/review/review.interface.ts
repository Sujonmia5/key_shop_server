import { ObjectId } from "mongoose";

export type TReview = {
  userId: ObjectId;
  productId: ObjectId;
  rating: number;
  comment: string;
};
