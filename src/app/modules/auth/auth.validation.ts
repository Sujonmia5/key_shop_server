import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter your email" }),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, "Password must be at least 8 characters long")
    .max(255, "Password must not exceed 255 characters"),
});

export const loginZodSchema = {
  loginSchema,
} as const;
