import { z } from 'zod';

export const BankInfoSchema = z.object({
  bankName: z.string().min(1),
  iban: z
    .string()
    .min(24)
    .regex(/^SA\d{22}$/, 'Invalid Saudi IBAN format'),
  beneficiaryName: z.string().min(2),
});
