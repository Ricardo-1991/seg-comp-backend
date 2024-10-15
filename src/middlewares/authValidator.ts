import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { CustomError } from '../interfaces/customError';
import { IUserValidator } from '../interfaces/IUserValidator';

export const userValidator = (schema: ZodSchema<IUserValidator>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error = new Error("Validação falhou.") as CustomError;
      error.status = 422; 
      error.data = result.error.errors; 

      return next(error); 
    }
    
    next();
  };
};
