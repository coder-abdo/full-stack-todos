import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import HttpException from "../utils/errorException";
interface IJwtPayload extends jwt.JwtPayload {
  id: string;
}
const COOKIEXPIREDTIME = 60 * 60 * 1000; // 1hour
export const auth = {
  async register(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new HttpException(400, "this user is already exist"));
      }
      const hashedPassword = await hash(password, 12);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      await user.save();
      return res.json({ message: "successfully registered" });
    } catch (err) {
      next(err);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(new HttpException(401, "this user is not exist"));
      }
      const passwordMatch = await compare(req.body.password, user.password);
      if (!passwordMatch) {
        return next(new HttpException(400, "Email or Password is incorrect"));
      }
      const token = jwt.sign({ id: user.id }, `${process.env.SECRETTOKEN}`);
      res.cookie("jwt", token, {
        maxAge: COOKIEXPIREDTIME,
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
        sameSite: true,
      });
      return res.json({ message: "successfully login", isAuthenticated: true });
    } catch (error) {
      next(error);
    }
  },
  async authorize(req: Request | any, res: Response, next: NextFunction) {
    try {
      const token = req.cookies["jwt"];
      const payload = jwt.verify(
        token,
        `${process.env.SECRETTOKEN}`
      ) as IJwtPayload;
      req.id = payload.id;
      next();
    } catch (error) {
      next(error);
    }
  },
  async logout(req: Request | any, res: Response, next: NextFunction) {
    try {
      res.clearCookie("jwt");
      res.json({ message: "successfully logout" });
    } catch (error) {
      next(error);
    }
  },
} as const;
