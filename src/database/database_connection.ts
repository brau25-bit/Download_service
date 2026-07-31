import { Config } from "../config/pg.config.js";
import 'dotenv/config'

import { QueryResultRow, Pool } from 'pg'

export class ConnectionPg{
    private static config: Config = {
        connectionString: String(process.env.DATABASE_URL)
    }

    private static pool = new Pool(this.config)

    static async query<T extends QueryResultRow>(text: string, params?: unknown[]){
        return this.pool.query<T>(text, params)
    }

    static async close(){
        await this.pool.end()
    } 
}