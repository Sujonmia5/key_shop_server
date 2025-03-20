import { z } from "zod";
import {
  category,
  ConnecntionType,
  Device,
  KeyboardSizes,
  OS,
} from "./product.constent";

// ✅ Fix: Ensure Object.values() is treated as a tuple
const osSchema = z.enum(
  Object.values(OS) as [
    (typeof OS)[keyof typeof OS],
    ...(typeof OS)[keyof typeof OS][]
  ]
);
const deviceSchema = z.enum(
  Object.values(Device) as [
    (typeof Device)[keyof typeof Device],
    ...(typeof Device)[keyof typeof Device][]
  ]
);
const categorySchema = z.enum(
  Object.values(category) as [(typeof category)[keyof typeof category]]
);
const keyboardSizeSchema = z.enum(
  Object.values(KeyboardSizes) as [
    (typeof KeyboardSizes)[keyof typeof KeyboardSizes]
  ]
);
const connectivitySchema = z.enum(
  Object.values(ConnecntionType) as [
    (typeof ConnecntionType)[keyof typeof ConnecntionType]
  ]
);

// ✅ Base Product Schema
const productSchema = z.object({
  sellerId: z.string().min(1, "Seller ID is required"),
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  regularPrice: z.number().min(0, "Regular price must be a positive number"),
  discount: z.number().optional(),
  stock: z.number().min(0, "Stock must be a positive number"),
  // images: z.array(z.string().url()),
  category: categorySchema,
  ratings: z.object({
    average: z.number().default(0),
    totalReviews: z.number().default(0),
  }),
  brand: z.string().optional(),
  model: z.string().optional(),
  isDeleted: z.boolean().default(false),
  discriptions: z
    .string()
    .max(2000, "Description cannot exceed 2000 characters"),
  customStyles: z
    .object({
      isStyled: z.boolean().optional(),
      styleTitle: z.string().optional(),
      styleDescription: z.string().optional(),
      styleImage: z.array(z.string().url()).optional(),
    })
    .optional(),
  additionalInfo: z
    .object({
      countryOfOrigin: z.string().optional(),
      madeIn: z.string().optional(),
    })
    .optional(),
  warranty: z.string().min(1),
});

// ✅ Keyboard Schema
const keyboardSchema = productSchema.extend({
  keyboardCategory: z.string().min(1, "Keyboard category is required"),
  features: z.object({
    series: z.string().optional(),
    styleAndSize: keyboardSizeSchema,
    type: z.string().min(1),
    connectionType: connectivitySchema,
    interface: z.enum(["USB", "Bluetooth"]),
    languages: z.object({
      english: z.boolean(),
      bangla: z.boolean(),
    }),
    rgb: z.boolean(),
    fingerprintSensor: z.boolean(),
    mechanicalKeys: z.boolean(),
    switchType: z.string().optional(),
    multimediaKeys: z.string().optional(),
    totalKeys: z.number().min(1),
    compatibility: z.object({
      os: z.array(osSchema), // ✅ Fix: Should be an array of OS enums
      devices: z.array(deviceSchema), // ✅ Fix: Should be an array of Device enums
    }),
    physicalDescription: z.object({
      color: z.string(),
      cableLength: z.string().optional(),
    }),
    keyMaterial: z.string().min(1),
  }),
});

// ✅ Switch Schema
const switchSchema = productSchema.extend({
  features: z.object({
    color: z.array(z.string().min(1)),
    languages: z.object({ english: z.boolean(), bangla: z.boolean() }),
    switchType: z.string().min(1),
    weight: z.string().min(1),
    Compatibility: z.string().optional(),
    material: z.array(z.string().min(1)),
    spring: z.string().optional(),
    distance: z.number().optional(),
    keyMaterial: z.string().min(1),
    switchQuantity: z.number().optional(),
    warranty: z.string().optional(),
  }),
});

// ✅ Keycap Schema
const keycapSchema = productSchema.extend({
  features: z.object({
    color: z.array(z.string().min(1)),
    keycapStyle: z.array(z.string().min(1)),
    weight: z.string().min(1),
    material: z.array(z.string().min(1)),
    keyMaterial: z.string().min(1),
    keycapQuantity: z.number().optional(),
  }),
});

// ✅ Accessory Schema
const accessorySchema = productSchema.extend({
  features: z.object({
    size: z.array(z.string()).optional(),
    color: z.array(z.string()).optional(),
    style: z.array(z.string()).optional(),
    accessoryType: z.string().min(1),
    weight: z.string().min(1),
    material: z.array(z.string().min(1)),
  }),
  warnings: z.array(z.string()).optional(),
});

// ✅ Export Zod Schemas
export const productZodSchema = {
  productSchema,
  keyboardSchema,
  switchSchema,
  keycapSchema,
  accessorySchema,
} as const;
