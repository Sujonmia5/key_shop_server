import express, { Router } from "express";
import { authController } from "./auth.controller";
const route: Router = express.Router();

route.post("/login", authController.loginUser);

export const authRoutes = route;
