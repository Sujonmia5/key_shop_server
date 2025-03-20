import express, { Router } from "express";
import validationCheck from "../../middleware/validationCheck";
import { productZodSchema } from "./product.validation";
import { productController } from "./product.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constent";
import { upload } from "../utils/uploadFiles";
const route: Router = express.Router();

route.post(
  "/add-product",
  auth(USER_ROLE.ADMIN),
  upload.array("files", 5),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationCheck(productZodSchema.productSchema),
  productController.createProduct
);

route.get("/", productController.getAllProduct);

route.get(
  "/my-products",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  productController.getMyProduct
);

route.delete("/:id", productController.deleteProduct);

export const productRoutes = route;
