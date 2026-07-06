import amqp, {Channel, ChannelModel} from 'amqplib'
import 'dotenv/config'

export class RabbitClient{
    static async createConnection(): Promise<ChannelModel>{
        try {
            const RABBIT_URL = process.env.RABBITMQ_URL

            const connection: ChannelModel = await amqp.connect(RABBIT_URL!)

            connection.on('error', () => {
                throw new Error("Error on connection")
            })

            connection.on('close', () => {
                throw new Error("Connection was closed")
            })

            return connection
        } catch (error) {
            console.log("Error on connection", error)
            await new Promise(res => setTimeout(res, 5000))

            return this.createConnection()
        }
    }

    static async createChannel(connection: ChannelModel): Promise<Channel> {
        const channel: Channel = await connection.createChannel()

        return channel
    }

    static setPrefetch(channel: Channel, prefetch: number) {
        channel.prefetch(prefetch)
    }

    static async declareQueue(channel: Channel, queue: string){
        const q = await channel.assertQueue(
            queue,
            {
                durable: true,
                arguments: {
                    'x-queue-type': 'classic'
                }
            }
        )

        return q
    }

    static async closeConnection(connection: ChannelModel, channel: Channel) {
        await channel.close()
        await connection.close()
    }
}