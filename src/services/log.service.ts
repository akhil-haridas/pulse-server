import prisma from "@prisma";
import { CreateLogInput, GetLogByDateInput, UpdateLogInput } from "@validations";

export const createLog = (userId: string, data: CreateLogInput) => {
    return prisma.dailyLog.create({
        data: {
            userId,
            content: data.content,
            date: data.date ? new Date(data.date) : new Date(),
        },
    });
};

export const getUserLogs = (userId: string) => {
    return prisma.dailyLog.findMany({
        where: { userId },
        orderBy: { date: "desc" },
    });
};

export const getLogByDate = async (data: GetLogByDateInput) => {
    const targetDate = new Date(data.date);
    return await prisma.dailyLog.findFirst({
        where: { userId: data.userId, date: targetDate },
    });
};

export const updateLog = (logId: string, data: UpdateLogInput) => {
    return prisma.dailyLog.updateMany({
        where: { id: logId },
        data: {
            content: data.content,
            date: data.date ? new Date(data.date) : undefined,
        },
    });
};

export const deleteLog = (logId: string, { userId }: { userId: string }) => {
    return prisma.dailyLog.deleteMany({ where: { id: logId, userId } });
};
