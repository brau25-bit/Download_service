import SeriesResponse from "../../models/response_models/series.res.js";
import { MangaRepository } from "../../repository/manga_repository.js";
import { ErrorHandler } from "../errors/globlal-err.js";
import { NotFoundError } from "../errors/not-found.js";

export class MangaService {
    static async getAllSeries(): Promise<SeriesResponse[]>{

        const result = await MangaRepository.getSeries();

        if(result.length == 0) throw new NotFoundError("serie not found", 404);

        return result
    }

    static async GetSerieById(id: string): Promise<SeriesResponse>{
        if(!id) throw new ErrorHandler("Id is required", 400);

        const result = await MangaRepository.getSerieById(id);

        if(!result) throw new NotFoundError("Serie not found", 404);

        return result
    }
}