import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "../../prisma/prismaClient"
import { CustomError } from '../interfaces/customError';

export const signupController = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { name, email, password, gender, cityId } = request.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                gender,
                cityId: Number(cityId)
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
                city: createUser.city 
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

