import { Response } from "express";
import { AuthenticatedRequest } from "@middlewares";
import { generateMonthlyReport } from "@services";

export const getMyMonthlyReport = async (req: AuthenticatedRequest, res: Response) => {
    const month = req.query.month as string;

    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
        return res.status(400).json({ error: "Invalid or missing month. Format must be YYYY-MM." });
    }

    const report = await generateMonthlyReport(req.user!.userId, month);
    res.json({ month, entries: report });
};
