import express from 'express'
import { Request, Response, NextFunction } from 'express';
import { setupSwagger } from './swagger';
import prisma from '../prisma/prismaClient'
import authRouter from './routes/auth'
import citiesRouter from './routes/cities'

import { CustomError } from '../models/interfaces';

const app = express()

app.use(express.json())

setupSwagger(app)

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/auth", authRouter) 
app.use(citiesRouter) 

app.use((error: CustomError, request: Request , response: Response, next: NextFunction) => {
    console.log(error)
    const status = error.status || 500
    const message = error.message || "Um erro ocorreu."
    const data = error.data
    response.status(status).json({message, data})
})

process.on("SIGINT", async () => {
    await prisma.$disconnect()
    process.exit(0)
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
    console.log('Documentação disponível em http://localhost:3000/api-docs');
})