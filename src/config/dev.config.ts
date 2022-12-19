export default {
    env: 'dev',
    mysql: {
        username: 'litendb',
        password: 'YLNriHJPjb7pkBDa',
        host: '39.106.109.165',
        port: '3306',
        pool: {
            max: 20,// 最大连接数, 太大服务器抗不住
            min: 0, // 最小连接数
            idle: 10000, // 连接释放之前可以空闲的最长时间（以毫秒为单位）。
        },
        url: '',
        dialect: 'mysql',
        replication: false,
        define: {
            charset: 'utf8mb4'
        },
        dialectOptions: {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            supportBigNumbers: true,
            bigNumberStrings: true,
            dateStrings: true,
            typeCast: true
        },
        dbname: 'litendb'
    },
}