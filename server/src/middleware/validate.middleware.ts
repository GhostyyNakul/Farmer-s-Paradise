import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodSchema } from 'zod';
import { ApiError } from '../utils/apiError.js';

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new ApiError(400, 'VALIDATION_ERROR', 'Invalid request body', error.flatten().fieldErrors)
        );
        return;
      }
      next(error as Error);
    }
  };
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query) as typeof req.query;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new ApiError(400, 'VALIDATION_ERROR', 'Invalid query parameters', error.flatten().fieldErrors)
        );
        return;
      }
      next(error as Error);
    }
  };
}

export function validateParams<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params) as typeof req.params;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new ApiError(400, 'VALIDATION_ERROR', 'Invalid route parameters', error.flatten().fieldErrors)
        );
        return;
      }
      next(error as Error);
    }
  };
}
