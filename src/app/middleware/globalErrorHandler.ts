/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";

const globalErrorHendler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  res.status(500).json({ message: "Internal Server Error", error });
};

export default globalErrorHendler;
