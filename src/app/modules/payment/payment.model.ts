import { model, Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const paymentSchema = new Schema<TPayment>(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    transaction_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    payment_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const MPayment = model("Payment", paymentSchema);
