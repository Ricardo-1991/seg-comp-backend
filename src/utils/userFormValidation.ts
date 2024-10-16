import prisma from "../../prisma/prismaClient";
import { CustomError } from "../interfaces/customError";

export const checkEmailExists = async (email: string): Promise<void> => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
        const error = new Error("E-mail já em uso.") as CustomError;
        error.status = 409; 
        throw error; 
    }
};

export const checkCpfExists = async (cpf: string): Promise<void> => {
    const user = await prisma.user.findUnique({ where: { cpf } });
    if (user) {
        const error = new Error("CPF já em uso.") as CustomError;
        error.status = 409;
        throw error; 
    }
};

export const validatePrivacyPolicy = (accepted: boolean): void => {
    if (!accepted) {
        const error = new Error("É necessário aceitar a política de privacidade.") as CustomError;
        error.status = 400; 
        throw error; 
    }
};