import { z } from 'zod';

export const steamIdSchema = z.object({
  steamId: z
    .string()
    .trim()
    .regex(
      /^\d{17}$/,
      'SteamID64 must consist of exactly 17 digits (e.g., 76561198000000000)',
    ),
});
