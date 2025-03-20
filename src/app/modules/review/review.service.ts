import mongoose from "mongoose";
import { MProduct } from "../product/product.model";
import { MUser } from "../user/user.model";
import { TReview } from "./review.interface";
import { MReview } from "./review.model";
import AppError from "../../error/AppError";
import status from "http-status";
import { USER_ROLE } from "../user/user.constent";
import QueryBuilder from "../../builder/QueryBuilder";

const createReview = async (payload: TReview, email: string) => {
  const user = await MUser.isUserExistByEmail(email);
  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }
  if (user?.role !== USER_ROLE.USER) {
    throw new AppError(status.FORBIDDEN, "Only user can create review");
  }
  payload.userId = user._id;

  const product = await MProduct.findById(payload.productId).lean();

  if (!product) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await MReview.create([payload], { session });

    if (!result || result.length === 0) {
      throw new AppError(status.BAD_REQUEST, "Failed to create review");
    }
    const Reviews = await MReview.aggregate(
      [
        { $match: { productId: result[0].productId } },
        {
          $group: {
            _id: "$productId",
            totalReview: { $sum: 1 },
            Rating: { $sum: "$rating" },
          },
        },
      ],
      { session }
    );

    if (Reviews && Reviews.length > 0) {
      const { totalReview, Rating } = Reviews[0];
      const avgRating = parseFloat((Rating / totalReview).toFixed(1));
      const updateReview = {
        "ratings.average": avgRating,
        "ratings.totalReviews": totalReview,
      };
      const productRating = await MProduct.findByIdAndUpdate(
        result[0].productId,
        updateReview,
        {
          new: true,
          session,
        }
      );
      if (!productRating) {
        throw new AppError(
          status.BAD_REQUEST,
          "Failed to create product rating"
        );
      }
    }
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

const getAllReviewsByProductId = async (
  productId: string,
  query: Record<string, unknown>
) => {
  const reviewQuery = new QueryBuilder(
    MReview.find({ productId }),
    query
  ).paginate();
  const result = await reviewQuery.modelQuery;
  return result;
};

const deleteReview = async (reviewId: string) => {
  const result = await MReview.findByIdAndDelete(reviewId);
  return result;
};

export const reviewService = {
  createReview,
  getAllReviewsByProductId,
  deleteReview,
} as const;
