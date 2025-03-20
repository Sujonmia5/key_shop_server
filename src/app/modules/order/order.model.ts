import { Schema, model } from "mongoose";
import { OrderStatus } from "./order.constent";
import { TOrder, TOrderProduct, TUserInfo } from "./order.interface";

const UserInfoSchema = new Schema<TUserInfo>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
});

const OrderProductSchema = new Schema<TOrderProduct>({
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  productCategory: {
    type: String,
    required: true,
  },
});

const OrderSchema = new Schema<TOrder>(
  {
    userInfo: {
      type: UserInfoSchema,
      required: true,
    },
    items: {
      type: [OrderProductSchema],
      required: true,
    },
    subtotalAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
      default: OrderStatus.PENDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const MOrder = model("Order", OrderSchema);
