import { NextFunction, Response, Request } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/apperror";

export const globalErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message, data: null });
    };
    
    if(error instanceof ZodError) {
        const errorMessage = error.issues.map(err => err.message).join(", ");
        res.status(400).json({ error: errorMessage, data: null });
    };

    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error", data: null });
};