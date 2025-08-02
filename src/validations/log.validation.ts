import { z } from "zod";

export const CreateLogSchema = z.object({
    content: z.string().min(10, "Log content is required"),
    date: z.string().optional(), // ISO string, defaults to today
});

export const UpdateLogSchema = z.object({
    content: z.string().min(10, "Log content is required").optional(),
    date: z.string().optional(),
});

export const GetLogByDateSchema = z.object({
    userId: z.string().uuid("Invalid user ID"),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
});

export type CreateLogInput = z.infer<typeof CreateLogSchema>;
export type UpdateLogInput = z.infer<typeof UpdateLogSchema>;
export type GetLogByDateInput = z.infer<typeof GetLogByDateSchema>;
