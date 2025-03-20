import asyncHandler from "../utils/asyncHandler";
import sendResponse from "../utils/sendResponse";
import { orderService } from "./order.service";

const createOrder = asyncHandler(async (req, res) => {
  const data = req.body;
  const user = req.user;
  const result = await orderService.createOrder(data, user);
  sendResponse(res, {
    statusCode: 201,
    message: "Order created successfully",
    success: true,
    data: result,
  });
});

const getAllOrder = asyncHandler(async (req, res) => {
  const query = req.query;
  const result = await orderService.getAllOrders(query);
  sendResponse(res, {
    statusCode: 200,
    message: "All orders retrieved successfully",
    success: true,
    data: result,
  });
});

export const orderController = {
  createOrder,
  getAllOrder,
} as const;
