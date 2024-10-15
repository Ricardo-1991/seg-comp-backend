import express from 'express'
import {z} from "zod"
import { signupController } from '../controllers/auth'
import { userValidator } from '../middlewares/authValidator';

const router = express.Router()

const signupSchema = z.object({
    name: z.string().min(5, { message: "Nome deve ter no mínimo 5 caracteres." }),
    email: z.string().email({ message: "Formato de e-mail inválido." }),
    password: z.string()
        .min(8, { message: "Senha deve ter no mínimo 8 caracteres." })
        .regex(/[A-Z]/, { message: "Senha deve conter pelo menos uma letra maiúscula." })
        .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número." })
        .regex(/[^a-zA-Z0-9]/, { message: "Senha deve conter pelo menos um caractere especial." }),
    gender: z.string({ message: "Necessário escolher um genero." }),
    cityId: z.number({ message: "Necessário escolher uma cidade." })
});


router.post("/signup", userValidator(signupSchema), signupController)


export default router