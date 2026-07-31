export type Config = {
    max?: number,
    database?: string,
    statement_timeout?: number,
    query_timeout?: number,
    connectionTimeoutMillis?: number,
    connectionString?: string
}