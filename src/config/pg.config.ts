import 'dotenv/config'

export type Config = {
    user?: string,
    password?: string,
    port?: number,
    database?: string,
    statement_timeout?: number,
    query_timeout?: number,
    connectionTimeoutMillis?: number
}