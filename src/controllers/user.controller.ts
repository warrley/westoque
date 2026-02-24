import { RequestHandler } from "express";
import { createUserValidator, listUsersValidator, updateUserValidator, userIdValidator } from "../validators/user.validator";
import * as userService from "../services/user.service";
import { saveAvatar } from "../services/file.service";

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
    
    res.status(200).json({ error: null, data: deletedUser });
};

export const listUsers: RequestHandler = async (req, res) => {
    const { offset, limit } = listUsersValidator.parse(req.query);
    const users = await userService.listUsers(offset, limit);
    // console.log(users);
    res.status(200).json({ error: null, data: users });
};

export const updateUser: RequestHandler = async (req, res) => {
    const { id } = userIdValidator.parse(req.params);
    const data = updateUserValidator.parse(req.body);

    let avatarFileName: string | undefined;
    if(req.file) {
        avatarFileName = await saveAvatar(req.file.buffer, req.file.originalname);
    };

    const updateData = {...data}
    if(avatarFileName) updateData.avatar = avatarFileName

    const updatedUser = await userService.updateUser(id, updateData);
    res.json({ error: null, data: updatedUser });
};