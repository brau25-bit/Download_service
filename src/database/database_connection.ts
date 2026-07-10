import { QueryResultRow, Pool } from 'pg'

import { Config } from "../config/pg.config.js";

export class ConnectionPg {
    private static config: Config = {
        user: process.env.PG_USER!,
        password: process.env.PG_PASSWORD!,
        port: Number(process.env.PG_PORT)!,
        database: process.env.PG_DB!,
    }

    private static pool = new Pool(this.config)

    static async query<T extends QueryResultRow>(text: string, params?: unknown[]){
        return this.pool.query<T>(text, params)
    }

    static async close(){
        await this.pool.end()
    } 
}