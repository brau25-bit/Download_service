import { error } from "console";
import { SeriesConsumer } from "../rabbitMQ/series_consumer.js";

SeriesConsumer.consume().catch(error)

