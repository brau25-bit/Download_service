import { RabbitClient } from "./connection.js";
import { config } from "../config/config.js";
import { ChapterService } from "../services/chapter_service.js";
import e from "express";

export class ChapterConsumer {

    private static queueName: string = String(config.chapter_queue);

    static async consume(){
        try {
            console.log("consumo iniciado: ", this.queueName);

            if(!this.queueName) throw new Error("no queue defined");

            const connection = await RabbitClient.createConnection();

            const channel = await RabbitClient.createChannel(connection);

            RabbitClient.setPrefetch(channel, 1);

            await RabbitClient.declareQueue(channel, this.queueName);

            channel.consume(this.queueName, async (message) => {
                if(!message) throw new Error("undefined message");

                try {
                    const data = JSON.parse(message.content.toString());

                    await ChapterService.main(data);

                    channel.ack(message);

                    console.log("consumo finalizado");
                } catch (error) {
                    console.log("Error procesando chapter:", error);

                    channel.nack(message, false, false);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}