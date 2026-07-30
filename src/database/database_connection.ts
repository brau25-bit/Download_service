import { QueryResultRow, Pool } from 'pg'

import { Config } from "../config/pg.config.js";

export class ConnectionPg{
    private static config: Config = {
        connectionString: process.env.DATABASE_URL!
    }

    private static pool = new Pool(this.config)

    static async query<T extends QueryResultRow>(text: string, params?: unknown[]){
        return this.pool.query<T>(text, params)
    }

    static async close(){
        await this.pool.end()
    } 
}