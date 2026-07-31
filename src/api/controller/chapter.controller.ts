import { Request, Response, NextFunction } from "express";

import { ChapterService } from "../service/chapter.service.js";
import { idSchema } from "../schema/schema.js";

export class ChapterController {
    static async GetAllChapters(
        req: Request, res: Response, next: NextFunction
    ): Promise<void> {
        try {
            const query = idSchema.parse(req.params);

            const { id } = query;

            const result = await ChapterService.GetAllChapters(id);
            
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async GetChapterById(
        req: Request, res: Response, next: NextFunction
    ): Promise<void>{
        try {
            const query = idSchema.parse(req.params);

            const { id } = query;

            const result = await ChapterService.GetChapterById(id);

            res.status(200).json(result)
        } catch (error) {
            next(error);    
        }
    }
}