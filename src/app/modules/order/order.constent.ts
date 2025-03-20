export const OrderStatus = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELED: "Canceled",
} as const;

export const PaymentMethod = {
  BKASH: "Bkash",
  NAGAD: "Nagad",
  CASH_ON_DELIVERY: "Cash on Delivery",
} as const;
