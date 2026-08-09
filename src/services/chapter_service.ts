import { Downloader } from "../file-manager/downloader.js";
import { MangaRepository } from "../repository/manga_repository.js";
import { Chapter } from '../models/data_models/chapter.models.js';
import { config } from "../config/config.js";

export class ChapterService { 

    private static path: string = config.series_path;

    static async main(msg: Chapter): Promise<string>{
        if(!msg) throw new Error("no message received");

        const {series_id, chapter_number, chapter_url, chapter_images} = msg;

        if(!series_id || !chapter_number || !chapter_images) throw new Error("Missing important data");

        const serie = await MangaRepository.getSerieById(msg.series_id);

        if(!serie) throw new Error("Not serie found");

        const {system_path} = serie;

        if(!system_path) throw new Error("no path defined for this series");

        const path_name: string = `${system_path}/chapter-${msg.chapter_number}`;
        
        const path: string = this.path; 

        const chapter_path = await Downloader.createDir(path, path_name);

        const chapter = {
            serie_id: serie.id,
            chapter_number: chapter_number,
            chapter_url: chapter_url,
            system_path: path_name
        }

        const result = await MangaRepository.saveChapter(chapter);

        if(!result) throw new Error("Not save properly");

        const {id} = result;

        for(const imageObj of msg.chapter_images){
            console.log("Proceso iniciado: descarga de imagen", imageObj);

            const {page_number, image} = imageObj;

            console.log(page_number, image, path_name)

            await Downloader.downloadImages(chapter_path, image, page_number);

            const data = {
                chapter_id: id!,
                img_number: page_number!,
                img_url: chapter_url!,
                system_path: path_name
            }

            await MangaRepository.saveChapterImages(data);

            console.log("descarga exitosa")
        }

        return 'ok'
    }
}