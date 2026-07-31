import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../errors/globlal-err.js";

export function errorHandler(
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
){       
    try {
        if(err instanceof ErrorHandler){
            return res.status(err.statusCode).json(err.message)
        }

        return res.status(500).json({
            'message': err.message
        })
    } catch (error) {
        throw new Error("error handler error")
    }
}