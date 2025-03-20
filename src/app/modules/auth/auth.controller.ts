import status from "http-status";
import asyncHandler from "../utils/asyncHandler";
import sendResponse from "../utils/sendResponse";
import { authService } from "./auth.service";

const loginUser = asyncHandler(async (req, res) => {
  const data = req.body;
  const result = await authService.loginUser(data);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User logged in successfully",
    success: true,
    data: result,
  });
});

export const authController = {
  loginUser,
} as const;
