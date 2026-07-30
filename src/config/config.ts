import dotenv from 'dotenv';

export const config = {
    rabbitMQ: process.env.RABBITMQ_URL!,
    port: process.env.PORT!,
    series_queue: process.env.SERIES_QUEUE!,
    chapter_queue: process.env.CHAPTER_QUEUE!,
    series_path: process.env.SERIES_PATH!,
}