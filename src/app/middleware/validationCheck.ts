import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import asyncHandler from "../modules/utils/asyncHandler";
import { getSchemaByCategory } from "../modules/product/product.utils";

const validationCheck = (schema: AnyZodObject) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.body.productCategory) {
        const schema = getSchemaByCategory(req.body.productCategory);
        if (!schema) {
          throw new Error("Invalid product category");
        }
        await schema.parseAsync(req.body);
      }
      const data = req.body;
      await schema.parseAsync(data);
      next();
    }
  );
};

export default validationCheck;
