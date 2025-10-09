import { z } from 'zod';

export const EntitySchema = z.object({
  organizationName: z.string().min(2),
  organizationEmail: z.string().email(),
  phone: z.string().min(9),
  region: z.string().min(1),
  city: z.string().min(1),
  unifiedNationalNumber: z.string().optional(), // locked if from Flow A
  supervisingAuthority: z.enum(['npo', 'awqaf', 'moc', 'other']),
  licenseNumber: z.string().min(1),
  licenseExpiry: z.string(),
  attachments: z.object({
    board: z.instanceof(File).optional(),
    authorityPermit: z.instanceof(File).optional(),
    waqfDeed: z.instanceof(File).optional(),
    commercialRecord: z.instanceof(File).optional(),
    otherPermit: z.instanceof(File).optional(),
  }),
});
