import { Request, Response, NextFunction } from "express";

import { MangaService } from "../service/manga.service.js";
import { idSchema } from "../schema/schema.js";

export class MangaController {
    static async getAllSeries(
        req: Request, res: Response, next: NextFunction
    ): Promise<void>{
        try {
            const result = await MangaService.getAllSeries();

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async GetSerieById(
        req: Request, res: Response, next: NextFunction
    ): Promise<void>{
        try {
            const query = idSchema.parse(req.params);

            const { id } = query;

            const serie = await MangaService.GetSerieById(id);

            res.status(200).json(serie);
        } catch (error) {
            next(error)
        }
    }
}