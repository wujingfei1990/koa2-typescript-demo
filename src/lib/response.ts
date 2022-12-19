import { Context } from "koa";

function success(ctx: Context, data: any = [],code: number = 0, msg: string = 'success') {
    ctx.body = {
        code,
        msg,
        data
    }
}
function error(ctx: Context, msg: string = 'error', code: number = 1) {
    ctx.body = {
        code,
        msg
    }

}

export default { success, error };