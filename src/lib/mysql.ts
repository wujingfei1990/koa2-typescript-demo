
import config from '../config'
import path from 'path';

import { Sequelize } from 'sequelize-typescript'

/**
 * 读写分离
 * 数据库拆分
 * @param dbname 数据库的名称
 * @param config 数据库配置项
 * @returns 返回Sequlize 实例
 */
interface Config {
    username: string,
    password: string,
    host: string,
    port: number,
    pool: object,
    url: string,
    dialect: string,
    replication: boolean,
    dbname: string
}
// const init = (config: Config) => {
//     const { username, password, host, port, url, dialect, replication, dbname } = config;
//     let options = {
//         dialect
//     };
//     // 不启用读写分离
//     if (!replication === true) {
//         options = { ...{ host, port, username, password }, ...options }
//     }
//     // 是否使用url 方式
//     if (url && url !== '') {
//         return new Sequelize(url, options);
//     }
//     return new Sequelize(dbname, null, null, options);
// }

// sql实例
const sequelize = new Sequelize(config.mysql.dbname, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    port: config.mysql.port,
    dialect: config.mysql.dialect,
    models: [path.join(__dirname, '..', 'models/**/*.ts'), path.join(__dirname, '..', 'models/**/*.js')]
});
const db = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to be database:', error);
    }
}
export default db;