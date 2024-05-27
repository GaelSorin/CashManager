import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import api from "./routes";
import express from "express";
import bodyParser from "body-parser";
import syncDB from "./utils/sync.db";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { AccountController } from "./controllers/account";

require("dotenv").config();

export const TPEs = new Map<string, Socket>();
const clientsTpe = new Map<Socket, Socket>();

import swaggerOptions from "./swagger-conf";
import Item from "./class/item.class";

dotenv.config({
  path: ".env",
});

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();
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

const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

io.on("connection", (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('howdy', (data) => {
    console.log(`Message from ${socket.id}:`, data);
    socket.emit('hello', 'world');
  });

  socket.on('ets-order', async (data) => {
    const price = data.price;
    const tpeId = data.tpeId.tpeId;
    const tpe = TPEs.get(tpeId);

    if (tpe) {
      clientsTpe.set(tpe, socket);
      tpe.emit('order', { type: 'order', price: price });
    } else {
      console.error(`TPE inconnu : ${tpeId}`);
    }
  });

  socket.on('new_tpeId', () => {
    const tpeId = generateId();
    TPEs.set(tpeId, socket);
    socket.emit('tpeId', { type: "tpeId", tpeId });

    socket.on('disconnect', () => {
      console.log(`Connexion Socket.IO fermée pour le tpe ${tpeId}`);
      TPEs.delete(tpeId);
    });

    socket.on('error', (error) => {
      console.error(`Erreur Socket.IO pour le tpe ${tpeId}:`, error);
    });
  });

  socket.on('remove_tpeId', () => {
    TPEs.forEach((value, key) => {
      if (value === socket) {
        TPEs.delete(key);
        console.log(`TPE ID supprimé : ${key}`);
      }
    });
  });

  socket.on('payement', async (data) => {
    console.log("paiement en cours");
    const tpe = TPEs.get(data.tpeId);
    
    if (tpe) {
      const client = clientsTpe.get(tpe);
  
      if (client) {
        const result = await AccountController.removeMoney(data.id, data.amount);
        if (!result) {
          console.log("payment failed");
          client.emit('payement-failed');
        } else {
          console.log("payment success")
          client.emit('payement-success');
        }
      } else {
        console.error("Client not found for TPE:", tpe);
      }
    } else {
      console.error("TPE not found for ID:", data.tpeId);
    }
  });
  
  socket.on('checkout', (data) => {
    console.log(`Checkout data received: totalAmount = ${data.totalAmount}`);
    io.emit('getcheckout', { totalAmount: data.totalAmount }); // Emit to all connected clients
  });
});

server.listen(port, async () => {
  await syncDB();
  console.log(`> Listening on port ${port}`);
});
