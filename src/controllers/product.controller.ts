import { RequestHandler } from "express";
import { createProductValidator } from "../validators/product.validator";
import * as productService from "../services/product.service";

export const createProduct: RequestHandler = async (req, res) => {
    const data = createProductValidator.parse(req.body);
    const product = await productService.createProduct(data);

    res.status(201).json({ error: null, data: product });
};