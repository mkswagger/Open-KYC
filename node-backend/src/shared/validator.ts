import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

type RequestLocation = 'query' | 'body' | 'params';

export function validateRequest(location: RequestLocation, schema: z.AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const validatedSchema = await schema.parseAsync(req[location]);
      req[location] = validatedSchema;
      next();
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
  };
}

export const otpSchema = z.object({
  device: z
    .string()
    .email()
    .or(
      z
        .string()
        .min(13)
        .max(13)
        .regex(/^\+?\d{12}$/),
    ),
});
