import { JwtPayload } from "jsonwebtoken";
import { TOrder, TOrderProduct } from "./order.interface";
import { MOrder } from "./order.model";
import { MUser } from "../user/user.model";
import AppError from "../../error/AppError";
import status from "http-status";
import { MProduct } from "../product/product.model";
import { paymentSession } from "./order.utils";

const createOrder = async (payload: TOrder, user: JwtPayload) => {
  const orderData: TOrder = { ...payload };

  const userInfoCheck = await MUser.isUserExistByEmail(user?.email);
  if (!userInfoCheck) {
    throw new AppError(status.BAD_GATEWAY, "User does not exist");
  }
  orderData.userInfo.userId = userInfoCheck?._id;

  const productId = orderData.items.map((item) => item.productId);

  // Check if product exist and enough quantity

  // methods one

  // const productItems = await MProduct.find({ _id: { $in: productId } });

  // const productMap = new Map(
  //   productItems.map((item) => [item._id.toString(), item])
  // );

  // const eachItems = orderData.items.map((item) => {
  //   const product = productMap.get(item.productId.toString());
  //   if (!product) {
  //     throw new AppError(status.NOT_FOUND, "product not founded!");
  //   }
  //   if (product.stock < item.quantity) {
  //     throw new AppError(status.BAD_REQUEST, "stock is not available");
  //   }
  //   const productItems: TOrderProduct = {
  //     ...item,
  //     sellerId: product.sellerId,
  //     productId: product._id,
  //     price: Math.round(product.price),
  //     totalPrice: Math.round(product.price) * item.quantity,
  //     discount: product.discount,
  //     productCategory: product.category,
  //   };
  //   return productItems;
  // });

  // orderData.subtotalAmount = eachItems.reduce(
  //   (acc, item) => acc + item.totalPrice,
  //   0
  // );
  // orderData.totalAmount = orderData.subtotalAmount + orderData.shippingCost;
  // orderData.items = eachItems;
  // const result = await MOrder.create(orderData);
  // // const result = await MO rder.create(payload);
  // if (!result) {
  //   throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to create order");
  // }
  // const customerInfo = {
  //   ...payload.userInfo,
  //   email: userInfoCheck.email,
  // };
  // await paymentSession(customerInfo, result.totalAmount);

  return {};
};

//Another order function

const getAllOrders = async (query: Record<string, unknown>) => {
  const result = await MOrder.find(query);
  return result;
};

const getOrderByUserId = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const result = await MOrder.find({ userInfo: userId }, query);
  return result;
};

const getOrderById = async (orderId: string) => {
  const result = await MOrder.findById(orderId);
  return result;
};

export const orderService = {
  createOrder,
  getAllOrders,
  getOrderByUserId,
  getOrderById,
} as const;
