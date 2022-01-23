import { Router } from "express";
import { auth } from "../controllers/authController";
import { todoController } from "../controllers/todosController";
import { user } from "../controllers/userController";

const router = Router();

router.post("/api/auth/register", auth.register);
router.post("/api/auth/login", auth.login);
router.get("/api/auth/logout", auth.logout);

router.get("/api/user", auth.authorize, user.getUser);
router.get("/api/todos", auth.authorize, todoController.getAllTodos);
router.post("/api/todos", auth.authorize, todoController.addTodo);
router.put("/api/todos/:id", auth.authorize, todoController.updateTodo);
router.delete("/api/todos/:id", auth.authorize, todoController.deleteTodo);
export default router;
