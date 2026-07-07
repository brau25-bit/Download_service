import { RabbitClient } from "./connection.js";
import { SeriesService } from "../services/series_service.js";
import { config } from "../config/config.js";

export class SeriesConsumer {
    static async consume(){
        const queue_name = String(config.series_queue)

        try {
            const connection = await RabbitClient.createConnection()

            const channel = await RabbitClient.createChannel(connection)

            RabbitClient.setPrefetch(channel, 1)

            if(!queue_name) throw new Error("sin cola definida")

            await RabbitClient.declareQueue(channel, queue_name)
            
            channel.consume(queue_name, async (message) => {
                
                if(!message) throw new Error("Empty message")

                try {
                    const data = JSON.parse(message.content.toString())

                    await SeriesService.main(data)

                    channel.ack(message)

                    console.log("proceso terminado")                    
                    
                } catch (error) {
                    console.log(error)

                    channel.nack(message, false, false)
                }
            })
        } catch (error) {
            console.log("Error")
        }
    }
}