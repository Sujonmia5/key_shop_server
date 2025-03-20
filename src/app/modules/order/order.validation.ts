import { z } from "zod";
import { PaymentMethod } from "./order.constent";
import { TPaymentMethod } from "./order.interface";
import mongoose from "mongoose";

const UserInfoSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, "Name cannot be empty."),
  phone: z.string().optional(),
  address: z.object({
    street: z
      .string({
        required_error: "Street is required.",
      })
      .min(1, "Street cannot be empty."),
    city: z
      .string({
        required_error: "City is required.",
      })
      .min(1, "City cannot be empty."),
    state: z.string().optional(),
    postalCode: z
      .string({
        required_error: "Postal Code is required.",
      })
      .min(1, "Postal Code cannot be empty."),
    country: z
      .string({
        required_error: "Country is required.",
      })
      .min(1, "Country cannot be empty."),
  }),
});

const OrderProductSchema = z.object({
  productId: z.string({ required_error: "Product ID is required." }).refine(
    (val) => {
      return mongoose.Types.ObjectId.isValid(val);
    },
    { message: "Product ID is invalid." }
  ),
  name: z
    .string({
      required_error: "Product name is required.",
    })
    .min(1, "Product name cannot be empty."),

  quantity: z
    .number({
      required_error: "Quantity is required.",
    })
    .min(1, "Quantity must be at least 1."),
});

const paymentMethodEnum = z.enum(
  Object.values(PaymentMethod) as [TPaymentMethod],
  {
    required_error: "Payment Method is required.",
  }
);

const OrderSchema = z.object({
  userInfo: UserInfoSchema,
  items: z.array(OrderProductSchema).min(1, "At least one item is required."),
  shippingCost: z
    .number({
      required_error: "Shipping Cost is required.",
    })
    .min(0, "Shipping Cost cannot be negative."),
  // trackingId: z.string().optional(),
  paymentMethod: paymentMethodEnum,
});

export const orderZodSchema = {
  OrderSchema,
} as const;
