import { Router } from "express";
import * as productController from "../controllers/product.controller"

const router = Router();

router.post("/", productController.createProduct);

export default router;