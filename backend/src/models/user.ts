import Sequelize from "sequelize";
import Database from "../class/db.class";
import bcrypt from "bcrypt";
const sequelize = Database.getInstance().pool;

export let UserModel = sequelize.define(
    "ps_users",
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
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
    }
);

UserModel.beforeCreate(async (user: any) => {
    try {
        const hash = await bcrypt.hash(user.get("password") as string, 10);
        user.set("password", hash);
    } catch (err) {
        throw new Error();
    }
});

UserModel.beforeUpdate(async (user: any) => {
    try {
        const hash = await bcrypt.hash(user.get("password") as string, 10);
        user.set("password", hash);
    } catch (err) {
        throw new Error();
    }
});