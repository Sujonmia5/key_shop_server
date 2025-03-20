import express, { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constent";
import { orderController } from "./order.controller";
import validationCheck from "../../middleware/validationCheck";
import { orderZodSchema } from "./order.validation";

const route: Router = express.Router();

route.post(
  "/create",
  auth(USER_ROLE.USER),
  validationCheck(orderZodSchema.OrderSchema),
  orderController.createOrder
);

export const orderRoutes = route;
