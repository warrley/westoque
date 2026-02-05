import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.get("/", userController.listUsers);
router.get("/:id", userController.getUser);
router.delete("/:id", userController.deleteUser);

export default router;