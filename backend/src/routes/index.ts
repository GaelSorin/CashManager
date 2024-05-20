import express from "express";
import auth from "./auth";
import user from "./user";
import item from "./item";
import tpe from "./tpe";
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", auth);
app.use("/user", user);
app.use("/item", item);
app.use("/tpe", tpe);


export default app;