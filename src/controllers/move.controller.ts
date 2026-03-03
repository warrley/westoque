import { RequestHandler } from "express";
import { addMoveValidator, listMovesValidator } from "../validators/move.validator";
import * as moveService from "../services/move.service";

export const addMove: RequestHandler = async (req, res) => {
    const data = addMoveValidator.parse(req.body);
    const move = await moveService.addMove({
        ...data,
        userID: req.user?.id as string
    });
    
    res.status(201).json({ error: null, data: move });
};

export const listMoves: RequestHandler = async (req, res) => {
    const data = listMovesValidator.parse(req.query);
    const moves = await moveService.listMoves(data);
    
    res.status(200).json({ error: null, data: moves });
};