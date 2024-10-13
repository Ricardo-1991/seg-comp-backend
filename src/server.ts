import express from 'express'
import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prismaClient'

import { CustomError } from '../models/interfaces';

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");
    next();
})

app.use() // rotas


app.use((error: CustomError, req: Request , res: Response, next: NextFunction) => {
    console.log(error)
    const status = error.status || 500
    const message = error.message || "Um erro ocorreu."
    const data = error.data
    res.status(status).json({message, data})
})

process.on("SIGINT", async () => {
    await prisma.$disconnect()
    process.exit(0)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})