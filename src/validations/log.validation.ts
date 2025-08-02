import { z } from "zod";

export const CreateLogSchema = z.object({
    content: z.string().min(10, "Log content is required"),
    date: z.string().optional(), // ISO string, defaults to today
});

export const UpdateLogSchema = z.object({
    content: z.string().min(10, "Log content is required").optional(),
    date: z.string().optional(),
});

export type CreateLogInput = z.infer<typeof CreateLogSchema>;
export type UpdateLogInput = z.infer<typeof UpdateLogSchema>;
