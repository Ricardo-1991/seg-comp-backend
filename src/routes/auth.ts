import express from 'express'
import {z} from "zod"
import { LoginController, signupController } from '../controllers/auth'
import { userValidator } from '../middlewares/authValidator';
import { isValidCPF } from '../utils/validateCPF';

const router = express.Router()

const signupSchema = z.object({
    name: z.string().min(5, { message: "Nome deve ter no mínimo 5 caracteres." }),
    email: z.string().email({ message: "Formato de e-mail inválido." }),
    password: z.string()
        .min(8, { message: "Senha deve ter no mínimo 8 caracteres." })
        .regex(/[A-Z]/, { message: "Senha deve conter pelo menos uma letra maiúscula." })
        .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número." })
        .regex(/[^a-zA-Z0-9]/, { message: "Senha deve conter pelo menos um caractere especial." }),
    confirmPassword: z.string(),
    cpf: z.string().refine((value) => isValidCPF(value), { message: "CPF inválido." }),
    gender: z.string({ message: "Necessário escolher um genero." }),
    cityId: z.number({ message: "Necessário escolher uma cidade." }),
    privacyPolicyAccepted: z.boolean().refine(val => val === true, { message: "Você deve aceitar a política de privacidade." }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Senhas devem ser iguais.",
    path: ["confirmPassword"]
})

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               confirmPassword:
 *                 type: string
 *               cpf:
 *                 type: string
 *                 description: CPF no formato xxx.xxx.xxx-xx
 *               gender:
 *                 type: string
 *               cityId:
 *                 type: integer
 *               privacyPolicyAccepted:
 *                 type: boolean
 *                 description: Não aceitar a privacidade
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       409:
 *         description: E-mail ou CPF já em uso.
 */

router.post("/signup", userValidator(signupSchema), signupController)


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login de usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Usuário logado com sucesso.
 *       401:
 *         description: Senha ou e-mail inválido.
 */
router.post("/login", LoginController)


export default router