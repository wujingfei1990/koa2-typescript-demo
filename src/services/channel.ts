import channel from "../models/channel";
import message from "../models/message";
class channelService {
    async getChannelList() {
        return channel.findAll();
    }
    async createChannel(name: string) {
        return channel.findOrCreate({
            where: { name }
        })

    }
    async getChannelById(channelId: number) {
        return channel.findOne({
            where: {
                id: channelId
            }
        })
    }
    async createMessage(options: any) {
        const { title, content, channel, createdAt } = options;
        return message.create({
            title,
            content,
            channel,
            createdAt
        })
    }
    async getMessageList(channel: number, page: number = 1, limit: number = 10) {
        return message.findAndCountAll({
            where: {
                channel:Number(channel)
            },
            limit:Number(limit),
            offset: (page - 1) * limit,
            order: [['createdAt', 'DESC']]
        })
    }
}

export default new channelService;