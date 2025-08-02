import { AuthenticatedRequest } from "@middlewares";
import { Response } from "express";
import {
    createLog,
    getUserLogs,
    updateLog,
    deleteLog,
    getLogByDate,
} from "@services";

export const createLogHandler = async (req: AuthenticatedRequest, res: Response) => {
    const userId = (req as any).user.id;
    const { content } = req.body;

    const existing = await getLogByDate({ userId, date: new Date().toISOString().split("T")[0] });
    if (existing) return res.status(400).json({ error: "Log already exists for today." });

    const log = await createLog(userId, content);
    res.status(201).json({ log });
};

export const getMyLogs = async (req: AuthenticatedRequest, res: Response) => {
    const userId = (req as any).user.id;
    const logs = await getUserLogs(userId);
    res.status(200).json({ logs });
};

export const getLogByDateHandler = async (req: AuthenticatedRequest, res: Response) => {
    const userId = (req as any).user.id;
    const { date } = req.params;

    const log = await getLogByDate({ userId, date });
    if (!log) return res.status(404).json({ error: "Log not found for given date" });

    res.status(200).json({ log });
};

export const updateDailyLog = async (req: AuthenticatedRequest, res: Response) => {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const { content } = req.body;

    const updated = await updateLog(id, { content });
    if (!updated.count) return res.status(404).json({ error: "Log not found" });

    res.status(200).json({ message: "Updated successfully" });
};

export const deleteDailyLog = async (req: AuthenticatedRequest, res: Response) => {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const deleted = await deleteLog(id, { userId });
    if (!deleted.count) return res.status(404).json({ error: "Log not found" });

    res.status(200).json({ message: "Deleted successfully" });
};