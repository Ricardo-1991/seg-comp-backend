import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "../../prisma/prismaClient"

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, gender, cityId } = req.body;
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
        res.status(201).json({
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

