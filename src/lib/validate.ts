import Schema, { Rules, Values } from "async-validator";
import { Context } from "koa";

async function validate<T extends Values>(ctx: Context, rules: Rules): Promise<{ data: T, error: any | null }> {
    const validator = new Schema(rules);
    let data: any;
    switch (ctx.method) {
        case 'GET':
            data = JSON.parse(JSON.stringify(ctx.request.query));
            break
        case 'POST':
            data = ctx.request.body;
    }
    return validator.validate(data).then(() => {
        return {
            data: data as T,
            error: null
        }

    }).catch(error => {
        return {
            data: {} as T,
            error: error.errors[0].message
        }
    })
}

export default validate;