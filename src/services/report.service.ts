import prisma from "@prisma";

export const generateMonthlyReport = async (userId: string, month: string) => {
    const start = new Date(`${month}-01T00:00:00.000Z`);
    const end = new Date(new Date(start).setMonth(start.getMonth() + 1));

    const logs = await prisma.dailyLog.findMany({
        where: {
            userId,
            createdAt: {
                gte: start,
                lt: end,
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    const report = logs.map((log) => ({
        date: log.createdAt.toISOString().split("T")[0],
        content: log.content,
    }));

    return report;
};
