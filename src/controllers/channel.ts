import { Context } from "koa";
import channelService from '../services/channel'
import response from '../lib/response'
import validate from "../lib/validate";
import { Rules } from "async-validator";
import paginate from "../lib/paginate";



class channelController {
    async getChannelList(ctx: Context) {
        let res = await channelService.getChannelList();
        response.success(ctx, res)
    }
    async add(ctx: Context) {
        const rules: Rules = {
            name: [
                {
                    type: 'string',
                    required: true,
                    message: 'Field cannot be empty'
                }
            ]
        }
        interface Ichannel {
            name: string
        }
        const { data, error } = await validate<Ichannel>(ctx, rules);
        if (error !== null) {
            return response.error(ctx, error);
        }
        const { name } = data;
        let res = await channelService.createChannel(name);
        if (res[1]) {
            response.success(ctx, res[0]);
        } else {
            response.error(ctx, 'Channel already exists')
        }

    }
    async addMessage(ctx: Context) {
        const rules: Rules = {
            title: [
                {
                    type: 'string',
                    required: true,
                    message: 'Field cannot be empty'
                }
            ],
            content: [
                {
                    type: 'string',
                    required: true,
                    message: 'Field cannot be empty'
                }
            ],
            channel: [
                {
                    type: 'number',
                    required: true,
                    message: 'Field ch cannot be empty'
                }
            ]
        }
        interface Imessage {
            title: string,
            content: string,
            channel: number

        }
        const { data, error } = await validate<Imessage>(ctx, rules);
        if (error !== null) {
            return response.error(ctx, error);
        }
        const { title, content, channel } = data;
        //查看频道id是否存在
        let channelInfo = await channelService.getChannelById(channel);
        // console.log(channelInfo)
        if (channelInfo === null) {
            return response.error(ctx, 'Channel does not exist')
        }
        //插入消息
        let res = await channelService.createMessage({ title, content, channel, createdAt: new Date() });
        if (res) {
            response.success(ctx, res);
        } else {
            response.error(ctx, 'Failed to insert message')
        }


    }
    async getMessageList(ctx: Context) {
        const rules: Rules = {
            channel: [
                {
                    type: 'string',
                    required: true,
                    message: 'channel cannot be empty'
                }
            ]
        }
        interface Imessage {
            channel: number
            page?: number,
            limit?: number
        }
        const { data, error } = await validate<Imessage>(ctx, rules);
        if (error !== null) {
            return response.error(ctx, error);
        }
        let { channel, page, limit } = data;

        let { rows, count } = await channelService.getMessageList(<number><unknown>channel, <number><unknown>page, <number><unknown>limit);
        let res = paginate(rows, page, count, limit);
        response.success(ctx, res)

    }
}

export default new channelController;