import z from "zod";

export const dateRangeValidator = z.object({
    startDate: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid date").optional(),
    endDate: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid date").optional()
});
export type DateRangeInput = z.infer<typeof dateRangeValidator>;