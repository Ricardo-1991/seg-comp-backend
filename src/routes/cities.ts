import express from 'express'
import { getAllCitiesController } from '../controllers/cities'
import { isAuth } from '../middlewares/is-auth'

const router = express.Router()

/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Retorna todas as cidades da Bahia.
 *     tags: 
 *       - Cidades
 *     responses:
 *       200:
 *         description: Lista de cidades da Bahia.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Salvador"
 *       400:
 *         description: Requisição inválida.
 *       500:
 *         description: Erro interno no servidor.
 */
router.get("/cities", getAllCitiesController) // To do: Implementar autenticação

export default router