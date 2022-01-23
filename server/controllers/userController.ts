import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import HttpException from "../utils/errorException";

export const user = {
  async getUser(req: Request | any, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.id).populate("todos");
      if (!user) {
        return next(new HttpException(401, "this user is not exist"));
      }
      return res.json({ user });
    } catch (err) {
      next(err);
    }
  },
} as const;
