import { Downloader } from "../file-manager/downloader.js";
import { MangaRepository } from "../repository/manga_repository.js";
import { Chapter } from '../models/data_models/chapter.models.js';

export class ChapterService { 
    static async main(msg: Chapter): Promise<string>{
        if(!msg) throw new Error("no message received");

        const {series_id, chapter_number, chapter_url, chapter_images} = msg;

        if(!series_id || !chapter_number || !chapter_images) throw new Error("Missing important data");

        const serie = await MangaRepository.getSerieById(msg.series_id);

        if(!serie) throw new Error("Not serie found");

        const {system_path} = serie;

        if(!system_path) throw new Error("no path defined for this series");

        const path_name: string = `chapter-${msg.chapter_number}`;
        
        const chapter_path = await Downloader.createDir(system_path!, path_name);

        const chapter = {
            serie_id: serie.id,
            chapter_number: chapter_number,
            chapter_url: chapter_url,
            system_path: chapter_path
        }

        const result = await MangaRepository.saveChapter(chapter);

        if(!result) throw new Error("Not found");

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
                system_path: chapter_path
            }

            await MangaRepository.saveChapterImages(data);

            console.log("descarga exitosa")
        }

        return 'ok'
    }
}