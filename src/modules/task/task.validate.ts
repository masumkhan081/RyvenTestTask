import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string({ required_error: "Task title is required" })
    .trim()
    .min(3, "Task title must be at least 3 characters long")
    .max(100, "Task title cannot exceed 100 characters"),

  shortDescription: z
    .string()
    .trim()
    .max(200, "Short description cannot exceed 200 characters")
    .optional(),

  description: z
    .string({ required_error: "Task description is required" })
    .trim(),

  startDate: z.coerce.date({ required_error: "Start date is required" }),
  dueDate: z.coerce.date({ required_error: "Due date is required" }),

  isCompleted: z.boolean().default(false),

  completionPercentage: z
    .number()
    .min(0, "Completion percentage cannot be less than 0")
    .max(100, "Completion percentage cannot be more than 100")
    .default(0),

  rewardCoins: z
    .number()
    .min(0, "Reward coins cannot be less than 0")
    .default(0),
});

export const updateTaskSchema = taskSchema.partial();
