import amqp, {Channel, ChannelModel} from 'amqplib'
import 'dotenv/config'
import { config } from '../config/config.js'

export class RabbitClient{
    static async createConnection(): Promise<ChannelModel>{
        try {
            const RABBIT_URL = config.rabbitMQ

            const connection: ChannelModel = await amqp.connect(RABBIT_URL!)

            connection.on('error', (err) => {
                throw err
            })

            connection.on('close', (err) => {
                throw err
            })

            return connection
        } catch (error) {
            console.log("Error on connection", error)

            await new Promise(res => setTimeout(res, 5000))

            return this.createConnection()
        }
    }

    static async createChannel(connection: ChannelModel): Promise<Channel> {
        try {
            const channel: Channel = await connection.createChannel()

            return channel
        } catch (error) {
            throw error
        }
    }

    static setPrefetch(channel: Channel, prefetch: number) {
        channel.prefetch(prefetch)
    }

    static async declareQueue(channel: Channel, queue: string){
        try {
            await channel.assertQueue(
                queue,
                {
                    durable: true,
                    arguments: {
                        'x-queue-type': 'classic',
                        'x-dead-letter-exchange': "",
                        'x-dead-letter-routing-key': `${queue}.dlq`
                    }
                }
            );

            await channel.assertQueue(`${queue}.dlq`, {
                durable: true
            });

        } catch (error) {
            throw new Error("Invalid Queue")
        }
    }

    static async closeConnection(connection: ChannelModel, channel: Channel) {
        try {
            await channel.close()
            await connection.close()
        } catch (error) {
            throw error
        }
    }
}