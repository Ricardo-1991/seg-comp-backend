import express, { Response, Request, NextFunction } from 'express'
import data from '../database/incidents.json'

const router = express.Router()

/**
 * @swagger
 * /incidents:
 *   get:
 *     summary: Incidentes na cidade.
 *     tags: 
 *       - Incidentes
 *     responses:
 *       200:
 *         description: Lista de ocorrências.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     description: |
 *                       Tipo do incidente (exemplo: Roubo, Homicídio)
 *                     example: "Roubo"
 *                   coordinates:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         description: Latitude do incidente
 *                         example: -14.811885
 *                       lon:
 *                         type: number
 *                         description: Longitude do incidente
 *                         example: -39.033719
 *                   address:
 *                     type: string
 *                     description: |
 *                       Endereço onde ocorreu o incidente
 *                     example: "R. Cel. José Félix"
 *                   neighborhood:
 *                     type: string
 *                     description: |
 *                       Bairro onde ocorreu o incidente
 *                     example: "Pontal"
 *       400:
 *         description: Requisição inválida.
 *       500:
 *         description: Erro interno no servidor.
 */
router.get("/incidents", (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(data)
})

export default router