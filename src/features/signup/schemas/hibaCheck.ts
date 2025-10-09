import { z } from 'zod';

export const HibaCheckSchema = z.object({
  unifiedNationalNumber: z
    .string()
    .min(1, 'License number is required')
    .min(10, 'License number must be at least 10 characters')
    .max(20, 'License number must not exceed 20 characters'),
});

export const OtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});
