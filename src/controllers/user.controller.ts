import { RequestHandler } from "express";
import { createUserValidator, listUsersValidator, updateUserValidator, userIdValidator } from "../validators/user.validator";
import * as userService from "../services/user.service";
import { AppError } from "../utils/apperror";

export const createUser: RequestHandler = async (req, res) => {
    const data = createUserValidator.parse(req.body);
    const user = await userService.createUser(data);
    res.status(201).json({ error: null, data: user });
};

export const getUser: RequestHandler = async (req, res) => {
    const { id } = userIdValidator.parse(req.params);
    const user = await userService.getUserById(id);

    res.status(200).json({ error: null, data: user });
};

export const deleteUser: RequestHandler = async (req, res) => {
    const { id } = userIdValidator.parse(req.params);
    const deletedUser = await userService.deleteUserById(id);
    
    res.status(200).json({ error: null, data: deleteUser });
};

export const listUsers: RequestHandler = async (req, res) => {
    const { offset, limit } = listUsersValidator.parse(req.query);
    const users = await userService.listUsers(offset, limit);
    console.log(users)
    res.status(200).json({ error: null, data: users });
};

export const updateUser: RequestHandler = async (req, res) => {
    const { id } = userIdValidator.parse(req.params);
    const data = updateUserValidator.parse(req.body);

    const updatedUser = await userService.updateUser(id, data);

    res.json({ error: null, data: updatedUser });
};