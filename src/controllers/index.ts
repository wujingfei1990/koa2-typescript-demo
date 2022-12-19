import { Context } from "koa";

class indexController {
    async index(ctx: Context) {
        ctx.body = 'index'
    }
}

export default new indexController;