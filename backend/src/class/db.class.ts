import Sequelize from "sequelize";
import dotenv from 'dotenv';

dotenv.config({
    path: '.env'
});

export default class Database {

    private static _pool: Sequelize.Sequelize;
    private static _db: Database;

    private constructor() {}

    public static getInstance() {
        if (!Database._db) {
            Database._db = new Database();
            Database._pool = new Sequelize.Sequelize(
                process.env.DB_NAME!,
                process.env.DB_USER!,
                process.env.DB_PASS,
                {
                    host: process.env.DB_HOST!,
                    dialect: "mariadb",
                    retry: {
                        max: 10,
                        match: [
                            Sequelize.ConnectionError,
                            Sequelize.ConnectionTimedOutError,
                            Sequelize.TimeoutError,
                            /Deadlock/i,
                            'SQLITE_BUSY'
                        ],
                    }
                }
            );
            Database._pool.authenticate().then(() => {
                // console.log("Sequelize has been initialized.");
            }).catch((err) => {
                // console.error("Sequelize failed to initialize.");
                // console.log(err)
                // throw new Error("Sequelize failed to initialize.");
            });
        }
        return Database._db;
    }

    public get pool() {
        return Database._pool;
    }

}