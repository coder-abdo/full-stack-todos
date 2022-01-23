import { NextFunction, Request, Response } from "express";
import { Todo } from "../models/Todo";
import { User } from "../models/User";
export const todoController = {
  async getAllTodos(req: Request | any, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.id);
      if (!user) {
        return res.sendStatus(401);
      }
      const todos = await Todo.find({ user });
      return res.json({ todos });
    } catch (error) {
      next(error);
    }
  },
  async addTodo(req: Request | any, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.id);
      if (!user) {
        return res.sendStatus(401);
      }
      const { title, completed } = req.body;
      const todo = await Todo.create({ title, user, completed });
      await todo.save();
      return res.json({
        message: "successfully added todo",
        status: res.status,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateTodo(req: Request | any, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.id);
      if (!user) {
        return res.sendStatus(401);
      }
      const { completed, title } = req.body;
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          completed,
          title,
        },
        {
          new: true,
        }
      );
      if (!todo) {
        return res.sendStatus(404);
      }
      return res.json({ message: "successfully update todo" });
    } catch (error) {
      next(error);
    }
  },
  async deleteTodo(req: Request | any, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.id);
      if (!user) {
        return res.sendStatus(401);
      }
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) {
        return res.sendStatus(404);
      }
      return res.json({ message: "successfully deleted" });
    } catch (error) {
      next(error);
    }
  },
} as const;
