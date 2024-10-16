import {Request , Response, NextFunction} from 'express'
import prisma from '../../prisma/prismaClient'


export const getAllCitiesController = async (request: Request, response: Response, next: NextFunction) => {
    
    try{
        const cities = await prisma.city.findMany({
            select: {
                name: true
            }
        })
        response.status(200).json(cities)
    }catch(error){
        next(error)
    }  
}