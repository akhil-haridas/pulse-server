import prisma from "@prisma";

export const generateMonthlyReport = async (userId: string, month: string) => {
    const [year, mon] = month.split("-").map(Number);
    const from = new Date(year, mon - 1, 1);
    const to = new Date(year, mon, 0, 23, 59, 59);

    const logs = await prisma.dailyLog.findMany({
        where: {
            userId,
            date: {
                gte: from,
                lte: to,
            },
        },
        orderBy: { date: "asc" },
    });

    return logs.map((log) => ({
        id: log.id,
        date: log.date.toISOString().split("T")[0],
        content: log.content,
    }));
};
