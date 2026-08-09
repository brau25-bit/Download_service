import manga_router from './routes/manga.routes.js';
import chapter_router from './routes/chapter.routes.js';
import { errorHandler } from './middleware/globlal-err-handler.js';
import { config } from '../config/config.js';

import 'dotenv/config'
import Express from 'express';
import health_router from './routes/health.js';
import cors from 'cors';

const server = Express();

server.use(cors());

server.use('/manga', manga_router);
server.use('/chapter', chapter_router);
server.use('/health', health_router)

server.use('/images', Express.static(config.series_path))

server.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log("listening on http://localhost:", process.env.PORT)
})