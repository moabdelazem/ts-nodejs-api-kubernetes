import { z } from "zod";

export const createFundSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.coerce.number().min(0, "Amount must be >= 0"),
  description: z.string().optional(),
});

export const updateFundSchema = z.object({
  name: z.string().min(1).optional(),
  amount: z.coerce.number().min(0, "Amount must be >= 0").optional(),
  description: z.string().optional(),
});

export type CreateFundInput = z.infer<typeof createFundSchema>;
export type UpdateFundInput = z.infer<typeof updateFundSchema>;
