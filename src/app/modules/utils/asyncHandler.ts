import { Request, RequestHandler, Response } from "express";
import { NextFunction } from "express-serve-static-core";

const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      return next(err);
    });
  };
};

export default asyncHandler;
