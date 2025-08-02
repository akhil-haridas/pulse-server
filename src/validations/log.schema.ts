import { z } from "zod";

export const createLogSchema = z.object({
    content: z.string().min(1, "Log content is required"),
    date: z.string().optional(), // ISO string, defaults to today
});

export const updateLogSchema = z.object({
    content: z.string().min(1, "Log content is required").optional(),
    date: z.string().optional(),
});

export type CreateLogInput = z.infer<typeof createLogSchema>;
export type UpdateLogInput = z.infer<typeof updateLogSchema>;
