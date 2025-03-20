import { productZodSchema } from "./product.validation";

export const getSchemaByCategory = (category: string) => {
  switch (category) {
    case "Keyboard":
      return productZodSchema.keyboardSchema;
    case "Switch":
      return productZodSchema.switchSchema;
    case "Keycap":
      return productZodSchema.keycapSchema;
    case "Accessory":
      return productZodSchema.accessorySchema;
    default:
      return;
  }
};
