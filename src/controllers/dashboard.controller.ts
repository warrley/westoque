import { RequestHandler } from "express";
import * as dashboardService from "../services/dashboard.service";
import { dateRangeValidator } from "../validators/dashboard.validator";

export const getInvetoryValue: RequestHandler = async (req, res) => {
    const data = await dashboardService.getInvetoryValue();

    res.status(201).json({ error: null, data });
};

export const getMovesSummary: RequestHandler = async (req, res) => {
    const query = dateRangeValidator.parse(req.query);
    const data = await dashboardService.getMovesSummary(query);

    res.status(200).json({ error: null, data });
};

export const getMovesGraph: RequestHandler = async (req, res) => {
    const query = dateRangeValidator.parse(req.query);
    const data = await dashboardService.getMovesGraph(query);

    res.status(200).json({ error: null, data });
};

export const getLowStockProducts: RequestHandler = async (req, res) => {
    const data = await dashboardService.getLowStockProducts();
    
    res.status(200).json({ error: null, data });
};