import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "../../prisma/prismaClient"
import { CustomError } from '../interfaces/customError'
import { validatePrivacyPolicy, checkCpfExists, checkEmailExists } from '../utils/userFormValidation'

export const signupController = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { name, email, password, confirmPassword, cpf, gender, cityId, privacyPolicyAccepted } = request.body;
        
        if(password !== confirmPassword) {
            const error = new Error("Senhas devem ser iguais.") as CustomError
            error.status = 400
            throw error
        }

        await Promise.all([
            checkEmailExists(email),
            checkCpfExists(cpf),
            validatePrivacyPolicy(privacyPolicyAccepted)
        ]);

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                cpf,
                gender,
                cityId: Number(cityId),
                privacyPolicyAccepted,
            },
            include: {
                city: true
            }
        })
        response.status(201).json({
            message: "Usuário criado com sucesso.",
            user: {
                id: createUser.id,
                name: createUser.name,
                email: createUser.email,
                gender: createUser.gender,
                cpf: createUser.cpf,
                city: createUser.city,
                privacyPolicyAccepted: createUser.privacyPolicyAccepted 
            }
        });
    } catch (error) {
        next(error);
    }
}

export const LoginController = async (request: Request, response: Response, next: NextFunction) => {
    const {email, password} = request.body;
    try {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if(!user) {
            const error = new Error("Email ou senha inválidos.") as CustomError
            error.status = 401
            throw error
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password)
    
        if(!isPasswordValid) {
            const error = new Error("Email ou senha inválidos.") as CustomError
            error.status = 401
            throw error
        }   
    
        const loadedUser = user
    
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser.id
            },
             "somesecretepasswordkey",
            {
                expiresIn: "1h"
            }
        )
        response.status(200).json({
            token,
            userId: loadedUser.id
        })
    }catch(error) {
        next(error)
    }
}

