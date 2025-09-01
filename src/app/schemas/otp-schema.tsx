import { z } from "zod";

export const OneTimePasswordSchema = z.object({
  code: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d+$/, "Only numbers are allowed"),
});

export type OtpSchemaType = z.infer<typeof OneTimePasswordSchema>;
