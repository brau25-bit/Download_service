import 'dotenv/config'

export const config = {
    rabbitMQ: process.env.RABBITMQ_URL!,
    port: process.env.PORT!,
    series_queue: process.env.SERIES_QUEUE!,
    chapter_queue: process.env.CHAPTER_QUEUE!,
}