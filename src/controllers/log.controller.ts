import { Request, Response } from "express";
import {
    createDailyLog,
    getUserLogs,
    updateDailyLog,
    deleteDailyLog,
} from "@services";
import { AuthenticatedRequest } from "@middlewares";

export const createLog = async (req: AuthenticatedRequest, res: Response) => {
    const log = await createDailyLog(req.user!.userId, req.body);
    res.status(201).json({ log });
};

export const getLogs = async (req: AuthenticatedRequest, res: Response) => {
    const logs = await getUserLogs(req.user!.userId);
    res.json({ logs });
};

export const updateLog = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const log = await updateDailyLog(id, req.body);
    res.json({ log });
};

export const deleteLog = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    await deleteDailyLog(id);
    res.status(204).send();
};
