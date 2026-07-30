import { error } from "console";
import { SeriesConsumer } from "../rabbitMQ/series_consumer.js";
import { ChapterConsumer } from "../rabbitMQ/chapter_consumer.js";

SeriesConsumer.consume().catch(error);

ChapterConsumer.consume().catch(error);
