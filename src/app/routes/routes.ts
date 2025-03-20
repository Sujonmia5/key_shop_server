import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { productRoutes } from "../modules/product/product.route";
import { authRoutes } from "../modules/auth/auth.route";
import { reviewRoutes } from "../modules/review/review.route";
import { orderRoutes } from "../modules/order/order.route";

const router = express.Router();

type TRoutes = {
  path: string;
  route: express.Router;
};

const appsRoutes: TRoutes[] = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoutes,
  },

  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/orders",
    route: orderRoutes,
  },
];

appsRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
