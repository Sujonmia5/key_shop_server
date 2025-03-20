import asyncHandler from "../utils/asyncHandler";
import { userService } from "./user.service";
import sendResponse from "../utils/sendResponse";
import { status } from "http-status";

const createUser = asyncHandler(async (req, res) => {
  const data = req.body;
  const result = await userService.createUserIntoDB(data);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "User created successfully",
    success: true,
    data: result,
  });
});

const getAllUser = asyncHandler(async (req, res) => {
  // const { email } = req.user;

  const result = await userService.getAllUserFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    message: "All users retrieved successfully",
    success: true,
    data: result,
  });
});

const updateUserInfo = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  const result = await userService.updateUserInfoIntoDB(userId, data);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User information updated successfully",
    success: true,
    data: result,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  await userService.deleteUserFromDB(userId);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User deleted successfully",
    success: true,
    data: null,
  });
});

export const userController = {
  createUser,
  getAllUser,
  updateUserInfo,
  deleteUser,
} as const;
