import 'dotenv/config'

export type Config = {
    host?: string,
    user?: string,
    password?: string,
    port?: number,
    max?: number,
    database?: string,
    statement_timeout?: number,
    query_timeout?: number,
    connectionTimeoutMillis?: number
}