import { z } from "zod";

// Name Validation Schema
const userNameSchema = z.object({
  firstName: z.string({ required_error: "First name is required." }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: "Last name is required." }),
});

// Address Validation Schema
const addressSchema = z.object({
  street: z.string({ required_error: "Street is required." }),
  city: z.string({ required_error: "City is required." }),
  postalCode: z.string({ required_error: "Postal code is required." }),
  country: z.string({ required_error: "Country is required." }),
});

// User Validation Schema
export const userSchema = z.object({
  name: userNameSchema,
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid email format." }),
  contactNo: z
    .string({ required_error: "Contact number is required." })
    .min(10, { message: "Contact number must be at least 10 digits long." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters long." }),
  profileImageUrl: z
    .string()
    .url({ message: "Invalid URL format." })
    .optional(),
  address: addressSchema.optional(),
});

const updateSchema = z.object({
  name: userNameSchema.partial().optional(),
  contactNo: z
    .string({ invalid_type_error: "Contact number is must be string." })
    .min(11, { message: "Contact number must be at least 10 digits long." })
    .optional(),
  profileImageUrl: z
    .string()
    .url({ message: "Invalid URL format." })
    .optional(),
  address: addressSchema.partial().optional(),
});

export const userZodSchema = {
  userSchema,
  updateSchema,
} as const;
