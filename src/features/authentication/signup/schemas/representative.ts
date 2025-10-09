import { z } from 'zod';

export const AssociateRepSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  role: z.string().min(1),
  nationalId: z.string().min(10),
});