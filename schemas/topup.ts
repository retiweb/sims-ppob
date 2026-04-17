import z from "zod";

export const topupSchema = z.object({
    top_up_amount: z.number().min(1, "Nominal harus lebih besar dari 0")
})