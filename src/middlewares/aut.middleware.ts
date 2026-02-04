import { RequestHandler } from "express";
import { AppError } from "../utils/apperror";
import * as userService from "../services/user.service";

export const authMiddleware: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return next(new AppError("Unauthorized", 401));

    const [scheme, token] = authHeader.split(" ");
    if(scheme != "Bearer" || !token) return next(new AppError("Unauthorized", 401));

    const user = await userService.validateToken(token);
    if(!user) return next(new AppError("Unauthorized", 401));

    req.user = user;
    next();
};