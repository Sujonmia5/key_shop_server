import asyncHandler from "../utils/asyncHandler";
import sendResponse from "../utils/sendResponse";
import { productService } from "./product.service";

const createProduct = asyncHandler(async (req, res) => {
  const user = req.user;
  const data = req.body;
  const files = req.files;
  const result = await productService.createProduct(data, user, files);
  sendResponse(res, {
    statusCode: 201,
    message: "Product created successfully",
    success: true,
    data: result,
  });
});

const getAllProduct = asyncHandler(async (req, res) => {
  const query = req.query;
  const result = await productService.getAllProduct(query);
  sendResponse(res, {
    statusCode: 200,
    message: "All products retrieved successfully",
    success: true,
    data: result,
  });
});

const getMyProduct = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const query = req.query;
  const result = await productService.getMyProduct(email, query);
  sendResponse(res, {
    statusCode: 200,
    message: "My products retrieved successfully",
    success: true,
    data: result,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await productService.deleteProduct(id);
  sendResponse(res, {
    statusCode: 200,
    message: "Product deleted successfully",
    success: true,
    data: null,
  });
});

export const productController = {
  createProduct,
  getAllProduct,
  deleteProduct,
  getMyProduct,
} as const;
