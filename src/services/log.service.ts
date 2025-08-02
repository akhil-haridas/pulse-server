import prisma from "@prisma";
import { CreateLogInput, GetLogByDateInput, UpdateLogInput } from "@validations";

export const createDailyLog = (userId: string, data: CreateLogInput) => {
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

export const getLogByDate = async (userId: string, data: GetLogByDateInput) => {
    const targetDate = new Date(data.date);
    return await prisma.dailyLog.findFirst({
        where: { userId, date: targetDate },
    });
};

export const updateLog = (logId: string, data: UpdateLogInput) => {
    return prisma.dailyLog.update({
        where: { id: logId },
        data: {
            content: data.content,
            date: data.date ? new Date(data.date) : undefined,
        },
    });
};

export const deleteLog = (logId: string) => {
    return prisma.dailyLog.delete({ where: { id: logId } });
};
