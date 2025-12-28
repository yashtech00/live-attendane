
import z from "zod"

export const classSchema = z.object({
    className: z.string().min(3, "Class name must be at least 3 characters long"),
});