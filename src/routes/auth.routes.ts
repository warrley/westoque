import { Router } from "express";
import * as authController from "../controllers/auth.controller"
import * as userController from "../controllers/user.controller"
import { authMiddleware } from "../middlewares/aut.middleware";

const router = Router();

router.post("/register", userController.createUser);
router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);

export default router;