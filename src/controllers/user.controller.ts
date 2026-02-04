import { RequestHandler } from "express";
import { createUserValidator, listUsersValidator } from "../validators/user.validator";
import * as userService from "../services/user.service";

export const createUser: RequestHandler = async (req, res) => {
    const data = createUserValidator.parse(req.body);
    const user = await userService.createUser(data);
    res.status(201).json({ error: null, data: user });
};

export const listUsers: RequestHandler = async (req, res) => {
    const { offset, limit } = listUsersValidator.parse(req.query);
    const users = await userService.listUsers(offset, limit);
    console.log(users)
    res.status(200).json({ error: null, data: users });
};