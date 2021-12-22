import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/errorException";

export function errorMiddleWare(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status ?? 500;
  const message = err.message ?? "something went wrong!!";
  res.status(status).json({
    message,
  });
}
