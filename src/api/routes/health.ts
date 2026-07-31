import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const health_router = Router();

health_router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200);
    } catch (error) {
        next(error);
    }
})

export default health_router;