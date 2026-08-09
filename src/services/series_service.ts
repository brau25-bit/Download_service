import { MangaRepository } from "../repository/manga_repository.js";
import { Downloader } from "../file-manager/downloader.js";
import SeriesDiscoverMessage from "../models/data_models/series.model.js";
import { config } from "../config/config.js";
import 'dotenv/config'
import { title } from "node:process";

export class SeriesService {

    private static path: string = config.series_path;

    static async main(msg: SeriesDiscoverMessage){
        console.log("msg received: ", msg);

        if(!msg) throw new Error('no message received from queue');

        if(!msg.title) throw new Error('title is required')

        const serie_exist = await MangaRepository.getSerieByTitle(msg.title);

        if( serie_exist != null ) throw new Error("Serie already exist");

        if(!this.path) throw new Error(`${this.path}`)

        const {} = msg;

        const sys_path = await Downloader.createDir(this.path, msg.title);

        if(!sys_path) throw new Error("failed to create the directory for the serie");

        const serie = {
            ...msg,
            system_path: msg.title
        }

        const result = await MangaRepository.saveSerie(serie);

        if(!result) throw new Error(`failed to save ${msg.title} serie to db`);

        return result
    }
}