import Koa from 'koa';
import koaBody from 'koa-body';
import router from './router';
import config from './config';
import db from './lib/mysql'
db();
const app = new Koa();

app.use(koaBody())

app.use(router.routes());
app.use(router.allowedMethods());


// 监听端口
app.listen(3001);
console.log(process.env.NODE_ENV);
console.log('http://localhost:3001');
// console.log(sequelize);

export default app;
