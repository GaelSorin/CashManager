import Sequelize from "sequelize";
import Database from "../class/db.class";
const sequelize = Database.getInstance().pool;

export let AccountModel = sequelize.define(
    "ps_accounts",
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        balance: {
            type: Sequelize.INTEGER,
            unique: false
        }
    }
);