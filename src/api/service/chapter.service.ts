import { ErrorHandler } from "../errors/globlal-err.js";
import { NotFoundError } from "../errors/not-found.js";
import { MangaRepository } from "../../repository/manga_repository.js";
import ChapterDTO from "../../models/response_models/chapter.res.js";
import ImagesDTO from "../../models/response_models/images.res.js";

export class ChapterService {
    static async GetAllChapters(id: string): Promise<ChapterDTO[]> {
        const result = await MangaRepository.getChapters(id);

        if(result.length === 0) throw new NotFoundError("Chapters not found", 404);

        return result
    }

    static async GetChapterById(id: string) : Promise<ImagesDTO[]>{
        const result = await MangaRepository.getChapterById(id);

        if(result.length === 0) throw new NotFoundError("Chapter not found", 404);

        return result
    }
}