import { RequestHandler } from "express";
import * as categoryService from "../services/category.service";
import { createCategoryValidator, getCategoryValidator, listCategoriesValidator } from "../validators/category.validator";
import { AppError } from "../utils/apperror";

export const createCategory: RequestHandler = async (req, res) => {
    const data = createCategoryValidator.parse(req.body);
    const category = await categoryService.createCategory(data);
    res.status(201).json({ error: null, data: category });
}; 

export const listCategories: RequestHandler = async (req, res) => {
    const { includeProductCount } = listCategoriesValidator.parse(req.query);
    const categories = await categoryService.listCategories(includeProductCount);
    res.status(200).json({ error: null, data: categories });
};  

export const getCategory: RequestHandler = async (req, res) => {
    const { id } = getCategoryValidator.parse(req.params);
    const category = await categoryService.getCategory(id);

    res.status(200).json({ error: null, data: category });
};