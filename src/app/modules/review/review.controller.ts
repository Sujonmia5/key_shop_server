import asyncHandler from "../utils/asyncHandler";
import sendResponse from "../utils/sendResponse";
import { reviewService } from "./review.service";

const createReview = asyncHandler(async (req, res) => {
  const data = req.body;
  const { email } = req.user;
  const result = await reviewService.createReview(data, email);
  sendResponse(res, {
    statusCode: 201,
    message: "Review created successfully",
    success: true,
    data: result,
  });
});

const getAllReviews = asyncHandler(async (req, res) => {
  const productId = req.params.productId as string;
  const query = req.query;
  const result = await reviewService.getAllReviewsByProductId(productId, query);
  sendResponse(res, {
    statusCode: 200,
    message: "Reviews retrieved successfully",
    success: true,
    data: result,
  });
});

export const reviewController = {
  createReview,
  getAllReviews,
} as const;
