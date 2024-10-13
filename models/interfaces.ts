import { ZodError } from "zod";

export interface CustomError extends Error {
    status?: number;
    data?: ZodError['issues']; 
}