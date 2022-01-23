import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import HttpException from "../utils/errorException";
interface IJwtPayload extends jwt.JwtPayload {
  id: string;
}
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
  async login(req: Request | any, res: Response, next: NextFunction) {
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

      return res.json({
        message: "successfully login",
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      next(error);
    }
  },
  async authorize(req: Request | any, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(
        token,
        `${process.env.SECRETTOKEN}`
      ) as IJwtPayload;
      if (payload) {
        req.id = payload.id;
        return next();
      }
    } catch (error) {
      return next(error);
    }
  },
  async logout(req: Request | any, res: Response, next: NextFunction) {
    try {
      req.id = null;
      res.json({ message: "successfully logout", isAuthenticated: false });
    } catch (error) {
      next(error);
    }
  },
} as const;
