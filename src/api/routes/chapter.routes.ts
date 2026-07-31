import { Router } from "express";

import { ChapterController } from "../controller/chapter.controller.js";

const chapter_router = Router();

chapter_router.get('/:id', ChapterController.GetAllChapters);

chapter_router.get('/:id/images', ChapterController.GetChapterById);

export default chapter_router;