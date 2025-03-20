import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import status from "http-status";
import { TRole } from "../modules/user/user.interface";
import { config } from "../config";

import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...args: TRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(status.UNAUTHORIZED, "you are not authorized user!");
      }
      const decoded = jwt.verify(token, config.jwt_secret as string);
      if (!decoded) {
        throw new AppError(status.UNAUTHORIZED, "Invalid token!");
      }
      const { role } = decoded as JwtPayload;
      if (!args.includes(role as TRole)) {
        throw new AppError(
          status.FORBIDDEN,
          "You are not authorized to access this route!"
        );
      }
      req.user = decoded as JwtPayload;
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default auth;
