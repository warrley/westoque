import { RequestHandler } from "express";
import { createProductValidator, listProductValidator } from "../validators/product.validator";
import * as productService from "../services/product.service";

export const createProduct: RequestHandler = async (req, res) => {
    const data = createProductValidator.parse(req.body);
    const product = await productService.createProduct(data);

    res.status(201).json({ error: null, data: product });
};

export const listProducts: RequestHandler = async (req, res) => {
    const { name, offset, limit } = listProductValidator.parse(req.query);
    const productList = await productService.listProduct(offset, limit, name);

    res.status(200).json({ error: null, data: productList });
};