import { ConnectionPg } from "../database/database_connection.js";
import SeriesResponse from "../models/response_models/series.res.js";
import ChapterDTO from "../models/response_models/chapter.res.js";
import ImagesDTO from "../models/response_models/images.res.js";

class PgClient {

    static async getSeries(){
        
    }

    static async getSerie(){
    
    }

    static async getChapter(){
        
    }

    static async saveSerie(params: SeriesResponse){
        const {id, source, title, cover, serie_url, system_path} = params;
        let result;

        const query: string = `
            INSERT INTO 
            series(id,source,title,cover,status,url,dir)
            VALUES($1, $2, $3, $4, $5, $6)
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

    static async saveChapter(params: ChapterDTO){
        const {serie_id, chapter_url, chapter_number, system_path} = params;
        let result;

        const query: string = `
            INSERT INTO 
            chapters(serie_id, chapter_url, chapter_number, system_path) 
            VALUES($1, $2, $3, $4)
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

        return result.rows[0];
    }

    static async saveChapterImages(params: ImagesDTO){
        const {chapter_id, img_url, img_number, system_path} = params;
        let result;

        const query: string = `
            INSERT INTO 
            images(chapter_id, img_url, img_number, system_path)
            VALUES($1,$2,$3,$4)
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

        return result.rows[0];
    }
} 