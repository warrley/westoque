import { RequestHandler } from "express";
import { authLoginValidator } from "../validators/auth.validator";
import * as userService from "../services/user.service"
import { AppError } from "../utils/apperror";

export const login: RequestHandler = async (req, res) => {
    const data = authLoginValidator.parse(req.body);
    const result = await userService.login(data.email, data.password);
    if(!result) throw new AppError("Invalid credentials", 401);

    res.status(200).json({ error: null, data: result });
};

export const logout: RequestHandler = async (req, res) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const [_, token] = authHeader.split(" ");
        if(token) {
            await userService.logout(token);         
        };
    };

    res.json({ error: null, data: { message: "Logout successful" } });
};

export const getMe: RequestHandler = async (req, res) => {
    if(!req.user) return res.status(404).json({ error: "User not found" });
    const user = userService.formatUser(req.user);

    
    res.json({ error: null, data: user });
};