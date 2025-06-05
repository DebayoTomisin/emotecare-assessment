import { z } from "zod";

export const eventFormSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    start: z.coerce.date(),
    end: z.coerce.date(),
    description: z.string().optional(),
  })
  .refine((data) => data.end > data.start, {
    message: "End time must be after start time",
    path: ["end"],
  });

export type EventFormData = z.infer<typeof eventFormSchema>;
