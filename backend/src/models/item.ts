import Sequelize from "sequelize";
import Database from "../class/db.class";
const sequelize = Database.getInstance().pool;

export let ItemModel = sequelize.define(
    "ps_items",
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            unique: false
        },
        price: {
            type: Sequelize.INTEGER,
            unique: false
        },
        image: {
            type: Sequelize.STRING,
            unique: false
        },
        id_user: { // reference to the user
            type: Sequelize.UUID,
            references: {
                model: "ps_users",
                key: "id"
            }
        }
    }
);