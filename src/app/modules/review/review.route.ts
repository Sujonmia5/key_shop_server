import express, { Router } from "express";
import { reviewController } from "./review.controller";
import validationCheck from "../../middleware/validationCheck";
import { reviewZodSchema } from "./review.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constent";

const route: Router = express.Router();

route.post(
  "/create",
  auth(USER_ROLE.USER),
  validationCheck(reviewZodSchema.reviewSchema),
  reviewController.createReview
);

route.get("/:productId", reviewController.getAllReviews);

export const reviewRoutes = route;
