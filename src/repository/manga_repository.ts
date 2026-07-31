import { ConnectionPg } from "../database/database_connection.js";
import SeriesResponse from "../models/response_models/series.res.js";
import ChapterDTO from "../models/response_models/chapter.res.js";
import ImagesDTO from "../models/response_models/images.res.js";
import { Chapter } from "../models/data_models/chapter.models.js";

export class MangaRepository {

    static async getSeries(): Promise<SeriesResponse[]>{
        const query: string = `
            SELECT * FROM series
        `;
        
        console.log("entrando repository")

        const result = await ConnectionPg.query<SeriesResponse>(query);

        console.log(result.rows)

        return result.rows!;
    }

    static async getSerieById(id: string): Promise<SeriesResponse>{
        const query_id: string = `
            SELECT * FROM series
            WHERE (id) = $1
        `;

        const data: string[] = [id];

        const result = await ConnectionPg.query<SeriesResponse>(query_id, data);

        if(result.rowCount == 0) throw new Error("No data found");

        return result.rows[0]!;
    }

    static async getSerieByTitle(title: string): Promise<SeriesResponse>{
        if(!title) throw new Error("Title was expected, but was not received");

        const query: string = `
            SELECT * FROM series
            WHERE(title) = $1
        `;

        const data: string[] = [title];

        const result = await ConnectionPg.query<SeriesResponse>(query, data);

        if(!result) throw new Error("not found");

        return result.rows[0]!;
    }

    static async getChapter(){
        
    }

    static async saveSerie(params: SeriesResponse){
        const {id, source, title, cover, serie_url, system_path} = params;
        let result;

        const query: string = `
            INSERT INTO 
            series(id,source,title,cover,serie_url,system_path)
            VALUES($1, $2, $3, $4, $5, $6)
            ON CONFLICT(id) DO NOTHING
            RETURNING *;
        `;

        const data = [
            id,
            source,
            title,
            cover,
            serie_url,
            system_path
        ];

        try {
            result = await ConnectionPg.query<SeriesResponse>(query, data);
        } catch (error) {
            throw error;
        }

        return result.rows[0];
    }

    static async saveChapter(params: ChapterDTO): Promise<ChapterDTO>{

        const {serie_id, chapter_url, chapter_number, system_path} = params;
        let result;

        const query: string = `
            INSERT INTO 
            chapters(serie_id, chapter_url, chapter_number, system_path) 
            VALUES($1, $2, $3, $4)
            RETURNING *
        `;

        const data = [
            serie_id,
            chapter_url,
            chapter_number,
            system_path
        ];

        try {
            result = await ConnectionPg.query<ChapterDTO>(query, data);
        } catch (error) {
            throw error;
        }

        if(result.rowCount == 0) throw new Error("not found");

        return result.rows[0]!;
    }

    static async saveChapterImages(params: ImagesDTO): Promise<ImagesDTO>{
        const {chapter_id, img_url, img_number, system_path} = params;
        let result;

        const query: string = `
            INSERT INTO 
            images(chapter_id, img_url, img_number, system_path)
            VALUES($1,$2,$3,$4)
            RETURNING *
        `;

        const data = [
            chapter_id,
            img_url, 
            img_number,
            system_path
        ];

        try {
            result = await ConnectionPg.query<ImagesDTO>(query, data);
        } catch (error) {
            throw error;
        }

        return result.rows[0]!;
    }
} 