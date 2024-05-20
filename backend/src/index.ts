import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import api from "./routes";
import express from "express";
import bodyParser from "body-parser";
import syncDB from "./utils/sync.db";
import http from "http";
import Socket from "./class/socket.class";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import WebSocket from "ws";
import {AccountController} from "./controllers/account";

require("dotenv").config();

export const TPEs = new Map;
const clientsTpe = new Map;

import swaggerOptions from "./swagger-conf";
import Item from "./class/item.class";
dotenv.config({
  path: ".env",
});

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const server = http.createServer(app);
const port = parseInt(process.env.PORT!) || 5000;

app.use(
  cors({
    origin: ["http://localhost", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser("secretcode"));

app.use("/api", api);

const wss = new WebSocket.Server({ server });

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

wss.on("connection", (ws: WebSocket) => {

  ws.on('message', async (message: string) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'message') {
      } else if (data.type === 'ets-order') {
        const cart = data.cart;
        const tpeId = data.tpeId.tpeId;
        const tpe = TPEs.get(tpeId);
        const prices = cart.cartItems.map((itemQ: {item: Item, quantity: number}) => itemQ.item.price * itemQ.quantity);
        if (tpe) {
          clientsTpe.set(tpe, ws);
          const totalPrice = prices.reduce((acc: any, price: any) => acc + price, 0);
          tpe.send(JSON.stringify({ type: 'order', price: totalPrice }));
        } else {
          console.error(`TPE inconnu : ${tpeId}`);
        }
      } else if (data.type === 'new_tpeId') {
        const tpeId = generateId();
        
        TPEs.set(tpeId, ws);
        
        ws.send(JSON.stringify({ type: "tpeId", tpeId }));


        // ws.on('close', () => {
        //   console.log(`Connexion WebSocket fermée pour le tpe ${tpeId}`);
        //   // Supprimer le tpe du mapping lorsque la connexion est fermée
        //   TPEs.delete(tpeId);
        // });
        // ws.on('error', (error) => {
        //   console.error(`Erreur WebSocket pour le tpe ${tpeId}:`, error);
        // });
      } else if (data.type === 'payement') {
        const tpe = TPEs.get(data.tpeId);
        const client = clientsTpe.get(tpe);

        // delete money from client account
        const result = await AccountController.removeMoney(data.id, data.amount);
        if (!result) {
          client?.send(JSON.stringify({ type: 'payement-failed'}));
        } else {
          client?.send(JSON.stringify({ type: 'payement-success'}));
        }
      }
    } catch (error) {
      console.error(`Erreur lors de la lecture du message:`, error);
    }
  });
});

console.log("Serveur WebSocket en écoute sur le port 5000");

server.listen(port, async () => {
  await syncDB();
  console.log(`> Listening on port ${port}`);
});