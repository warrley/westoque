import { RequestHandler } from "express";
import { createUserValidator } from "../validators/user.validator";
import * as userService from "../services/user.service";

export const createUser: RequestHandler = async (req, res) => {
    const data = createUserValidator.parse(req.body);
    const user = await userService.createUser(data);
    res.status(201).json({ error: null, data: user });
};