import { Schema, Types } from "mongoose";
import { OrderStatus, PaymentMethod } from "./order.constent";

export type TOrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export type TPaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export type TUserInfo = {
  userId: Schema.Types.ObjectId;
  name: string;
  phone?: string;
  address: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
};

export type TOrderProduct = {
  sellerId: Schema.Types.ObjectId;
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  discount?: number;
  productCategory: string;
};

export type TOrder = {
  userInfo: TUserInfo;
  items: TOrderProduct[];
  shippingCost: number;
  subtotalAmount: number;
  totalAmount: number;
  orderStatus: TOrderStatus;
  createdAt: Date;
  updatedAt: Date;
};
