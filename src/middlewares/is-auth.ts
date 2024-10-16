import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomError } from '../interfaces/customError';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const isAuth = (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    const authHeader = request.get('Authorization');

    if (!authHeader) {
        const error = new Error("Usuário não autorizado") as CustomError;
        error.status = 401;
        throw error;
    }

    const token = authHeader.split(" ")[1];
    console.log(`Token: ${token}`)
    let decodedToken: string | JwtPayload;

    try {
        decodedToken = jwt.verify(token, 's3cr3t') as string | JwtPayload;
        console.log(`Decoed Token: ${decodedToken}`)
    } catch (error) {
        next(error);
        return; 
    }

    if (!decodedToken || typeof decodedToken === 'string') {
        const error = new Error("Usuário não autorizado") as CustomError;
        error.status = 401;
        throw error;
    }
    request.userId = (decodedToken as JwtPayload).userId as string;
    console.log(`User ID: ${request.userId}`)
    next();
};
