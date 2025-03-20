import express, { Router } from "express";
import { userController } from "./user.controller";
import validationCheck from "../../middleware/validationCheck";
import { userZodSchema } from "./user.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constent";

const route: Router = express.Router();

route.post(
  "/create",
  validationCheck(userZodSchema.userSchema),
  userController.createUser
);

route.get("/", auth(USER_ROLE.ADMIN), userController.getAllUser);

route.put(
  "/:userId",
  validationCheck(userZodSchema.updateSchema),
  userController.updateUserInfo
);

route.delete("/:userId", userController.deleteUser);

export const userRoutes = route;
