import { Router } from "express";
import { MangaController } from "../controller/manga.controller.js";

const manga_router: Router = Router()

manga_router.get('/', MangaController.getAllSeries);

manga_router.get('/:id', MangaController.GetSerieById);

export default manga_router