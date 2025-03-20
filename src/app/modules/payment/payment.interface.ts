import { Types } from "mongoose";
import { PaymentStatus } from "./payment.constent";

export type TPaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
// Define your own types here
export type TPayment = {
  order_id: Types.ObjectId;
  status: boolean;
  transaction_id: string;
  amount: number;
  payment_status: TPaymentStatus;
  date: Date;
  payment_date: Date;
};
