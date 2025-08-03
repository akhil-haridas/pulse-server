import { Response } from "express";
import { AuthenticatedRequest } from "@middlewares";
import { generateMonthlyReport } from "@services";

export const getMyMonthlyReport = async (req: AuthenticatedRequest, res: Response) => {
    const userId = (req as any).user.id;
    const { month } = req.params;

    if (!/^\d{4}-\d{2}$/.test(month)) {
        return res.status(400).json({ error: "Invalid month format (use YYYY-MM)" });
    }

    const logs = await generateMonthlyReport(userId, month);
    res.status(200).json({ logs });
};
